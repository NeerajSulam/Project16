var monkey , monkey_running; 
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var gameState = "play";
var survivalTime = 0;
var collided_Monkey;
var gameOver, gameOverImage;


function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  collided_Monkey = loadImage("sprite_7.png");
  gameOverImage = loadImage("gameOverImage.png");
 
}



function setup() {
  createCanvas(600, 600);
  //creating sprite for monkey and adding animation 
  monkey = createSprite(300, 560, 30, 30);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.addAnimation("monkey_collided", collided_Monkey);
  monkey.scale = 0.2;
  //monkey.debug= true;
  
  // creating ground 
  ground =createSprite(300, 590, 1200, 10);
  //console.log(ground.x);
  ground.velocityX = -04;
  ground.x = ground.width/2;
  
  gameOver = createSprite(300, 300, 20, 20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  //creating groups for obstacles and bananas
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("red");

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime, 100, 50);
    
  if(ground.x < 0){
     ground.x = ground.width/2;
  }

  obstacles();
  bananas();
  
if(gameState === "play"){
   gameOver.visible = false;
   console.log(survivalTime);
   survivalTime = survivalTime + Math.ceil(frameRate()/100);

  if(keyDown("space")&& monkey.y >= 150){
    //console.log("jumping");
    monkey.velocityY = -12;
    }

  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();
     score = score+1;
    }
    
  if(obstacleGroup.isTouching(monkey)){
      gameState = "end";
      monkey.changeAnimation("monkey_collided",collided_Monkey );
     }else{
      monkey.changeAnimation("monkey_running", monkey_running);
     }
}
  
else if(gameState === "end"){
        gameOver.visible = true;
        
        if(mousePressedOver(gameOver)){
          monkey.changeAnimation("monkey_running", monkey_running);
          score = 0;
          survivalTime = 0;
          gameState = "play";
           
         } 
         FoodGroup.setVelocityXEach(0);
         obstacleGroup.setVelocityXEach(0);
  
         FoodGroup.destroyEach();
         obstacleGroup.destroyEach();
        
         monkey.changeAnimation("monkey_collided",collided_Monkey);
         survivalTime = survivalTime;
}

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  

  drawSprites();
}
function bananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(590, Math.round(random(120,200)), 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    //banana.debug = true;
    banana.setLifetime = 200;
    banana.scale = 0.1;
    FoodGroup.add(banana);
    
    }
}
function obstacles(){
  if(frameCount % 300 === 0){
     obstacle = createSprite(590, 550, 20, 20);
     obstacle.addImage(obstaceImage);
     //obstacle.debug = true;
     obstacle.velocityX = -3;
     obstacle.setLifetime = 200;
     obstacle.scale = 0.2;
     obstacleGroup.add(obstacle);
    }
}
