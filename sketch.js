var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage;
var obstacle1,obstacle2,obctacle3,obstacle4,obstacle5,obstacle6;
var score = 0;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup
var cloudsGroup 
var gameover_animation
var reset_animation
var gameover
var reset
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameover_animation = loadImage("gameOver.png");
  reset_animation = loadImage ("restart.png");

}

function setup() {
  createCanvas(600, 200);
   
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 fill("red");
   obstaclesGroup = new Group();
   cloudsGroup = new Group() ;

  gameover = createSprite (300,100,10,10);
  gameover.visible = false;
   gameover.addImage(gameover_animation);
  reset = createSprite (300,50,10,10);
  reset.visible = false;
     reset.addImage(reset_animation);

}

function draw() {
  background(100);
  if (gameState === PLAY ){
    if(keyDown("space") && trex.y>= 162 ) {
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5     
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if (frameCount % 5 ===0){
  score = score+1;
      }
      trex.collide(invisibleGround);
    if (obstaclesGroup.isTouching(trex)){
      gameState = END;
        }
  }
if (gameState === END){
trex.velocityY = 0;
  ground.velocityX = 0;
  cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
  gameover.visible = true;
  reset.visible = true;
}
  text ("score :" + score,500,50);
    spawnClouds();
  spawnObstacles();
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 140 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -2;
        var rand = Math.round(random(1,6));  
    switch(rand){
      case 1 : obstacle.addImage(obstacle1);
        break 
        case 2 : obstacle.addImage(obstacle2);
        break 
        case 3 : obstacle.addImage(obstacle3);
        break 
        case 4 : obstacle.addImage(obstacle4);
        break 
        case 5 : obstacle.addImage(obstacle5);
        break 
        case 6 : obstacle.addImage(obstacle6);
        break 
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
  }
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,160,40,10);
    cloud.y = random(10,100);
   cloud.addImage(cloudimage) ;
    cloud.scale = 0.5;
    cloud.velocityX = -3;
        cloud.lifetime = 210;
        cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}