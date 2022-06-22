var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cactus7, cactus1, cactus3, cactus2, cactus4, cactus6;
var gameover,gameoverimage,restart,restartimage
var PLAY = 1
var END= 0
var gamestate = PLAY

var cloudGroup, catusGroup

var score = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png")
  
  cactus7 = loadImage("obstacle1.png")

  cactus1 = loadImage("obstacle2.png")

  cactus2 = loadImage("obstacle3.png")

  cactus3 = loadImage("obstacle4.png")
  
  cactus4 = loadImage("obstacle5.png")

  cactus6 = loadImage("obstacle6.png")

  restartimage = loadImage("restart.png")

  gameoverimage = loadImage("gameOver.png")
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trex_collided",trex_collided)
  trex.scale = 0.5;
  trex.setCollider ("rectangle",0,0,80,80)
  trex.debug = false
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameover = createSprite(300,70)
  gameover.addImage("gameOver", gameoverimage)
  gameover.scale = 2.5
  gameover.visible = false

  restart = createSprite(300,120)
  restart.addImage("restart",restartimage)
  restart.scale = 0.5
  restart.visible= false

  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  cloudGroup= new Group ()
  cactusGroup= new Group ()
}

function draw() {
  //set background color
  
  background(180);
  
  console.log(trex.y)
  
  if (gamestate=== PLAY) {
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds()
    trexDestroyer()
    if (cactusGroup.isTouching(trex)){
    gamestate=END
    

    }
    ground.velocityX = -4;
    gameover.visible = false
    restart.visible = false

    if (frameCount%5===0) {
      score++

    }
  }

  else if (gamestate=== END){
 ground.velocityX = 0
 trex.velocityY = 0
 trex.changeAnimation("trex_collided", trex_collided)
 cactusGroup.setVelocityXEach(0)
 cloudGroup.setVelocityXEach (0)
 cactusGroup.setLifetimeEach (-1)
 cloudGroup.setLifetimeEach (-1)
 restart.visible= true
 gameover.visible= true
 if (mousePressedOver(restart)) {
   reset ()
 }
  }
  
  // jump when the space key is pressed
  
  text ("Score:"+ score,20,30)
 
  
 
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  //Spawn Clouds
  
  
  drawSprites();

  
  
  
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if (frameCount%60===0) {
   var cloud = createSprite (600,20,50,10)
   cloud.addImage(cloudImage)
   cloud.velocityX = -6
   cloud.scale = .5
   cloud.y = random (20,100)
   trex.depth= cloud.depth+1
   cloud.lifetime= 100
   cloudGroup.add( cloud)
 }
 
}

function trexDestroyer(){
if (frameCount%100===0){
 var cactus = createSprite (600,160)
 cactus.velocityX=-5
 rand = Math.round (random(1,6))
 switch(rand)
{
  case 1: cactus.addImage ("cactus7",cactus7)
  break
  case 2: cactus.addImage ("cactus1", cactus1)
  break
  case 3: cactus.addImage ("cactus2",cactus2)
  break 
  case 4: cactus.addImage ("cactus3",cactus3)
  break
  case 5: cactus.addImage ("cactus4",cactus4)
  break 
  case 6: cactus.addImage ("cactus6",cactus6)
  break
  default: break
}
cactus.scale = 0.5 
cactus.lifetime = 120
cactusGroup.add (cactus)
}

}

function reset (){
gamestate = PLAY
trex.changeAnimation ("running",trex_running)
score = 0
cloudGroup.destroyEach ()
cactusGroup.destroyEach ()

}