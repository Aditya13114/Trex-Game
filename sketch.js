var trex, trex_running, edges, trex_collided;
var groundImage;
var ground;
var invisibleGround;
var cloud;
var cloudImage;
var obstacle1, obstacle1Image;
var obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var obstaclesGroup, cloudsGroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameOver, restart;
var gameOverImage, restartImage;
var jumpSound;
var dieSound;
var checkPointSound;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadImage("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}
 
function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided" ,trex_collided);
  //trex.debug = true;
  //trex.setCollider("circle",0, 0, 40);
  
  gameOver = createSprite(300,100,20,20);
  gameOver.addImage("gameover",gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,150,10,10);
  restart.addImage("Restart", restartImage)
  restart.scale  = 0.5;
  restart.visible = false;
  
  
  
  //edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  ground = createSprite(200,180,400,20);
  ground.addImage("groundMoving",groundImage);
  
  invisibleGround = createSprite(200,200,400,20);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

}


function draw(){
  //set background color 
  background("white");
  textSize(19);
  text("score : " +score, 450,50);
  
  if(gamestate === PLAY){
  //score = score + Math.round(getFrameRate() / 60);
    if(frameCount % 5 === 0){
      score = score +1
    }
    
    ground.velocityX = -(4 + 3*score / 100);
    
    if(score > 0 && score % 100 === 0){
      checkPointSound.play();
    }
  
  if(obstaclesGroup.isTouching(trex)) {
     dieSound.play();
    gamestate = END;
  }
  
  
  
  
  //logging the y position of the trex
  //console.log(trex.y) 
  
  //jump when space key is pressed
  if(keyDown("space") && trex.y > 150){ 
    jumpSound.play();
    trex.velocityY = -11.5;
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  ground.velocityX = -8;
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnCloud();
  spawnObstacles();
  
  
  
  }
  else if(gamestate === END) {
   
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    

    
   
    
    
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("trex_collided",trex_collided);
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnCloud(){
  if(frameCount % 70 === 0 ) {
  
  
  cloud = createSprite(580,15,20,10);
  cloud.y = Math.round(random(15,100))
  cloud.velocityX = -5;
  cloud.addImage (cloudImage);
  console.log (cloud.depth)
  cloud.depth = trex.depth;
  cloud.lifetime = 200;
    
  trex.depth = trex.depth +1
    cloudsGroup.add(cloud);
    cloud.scale = 0.6;
 }
} 

function spawnObstacles(){
  if(frameCount % 120 === 0){
    obstacle = createSprite(580,170,15,15);
    obstacle.velocityX = -(6 +score/100);
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1 : obstacle.addImage(obstacle1);
      break;
      
      case 2 : obstacle.addImage(obstacle2);
      break;
        
      case 3 : obstacle.addImage(obstacle3);
      break;
        
      case 4 : obstacle.addImage(obstacle4);
      break;
        
      case 5 : obstacle.addImage(obstacle5);
      break;
        
      case 6 : obstacle.addImage(obstacle6);
      break;
      
      default : break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
  
  
}

function reset(){
  gamestate = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
   score = 0;
}