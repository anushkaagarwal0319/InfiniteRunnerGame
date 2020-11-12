var grave, graveImage
var girl, girlImage
var killer, killerImage
var bandaidImage, phoneImage
var score
var gameState = "PLAY"
var evilLaugh, suspense, ding


function preload(){
  
//load images
  
  graveImage = loadImage("graveyard.jpg");
  
  girlImage = loadImage("girl.png");
  
  killerImage = loadImage("killer.png");
  
  bandaidImage = loadImage("bandaid.png");
  
  phoneImage = loadImage("phone.png");
  
  knifeImage = loadImage("knife.png");
  
  creepySound = loadSound("creepybckground.mp3");
  
  evilLaugh = loadSound("evilLaugh.mp3");
  
  suspense = loadSound("suspense.mp3");
  
  ding = loadSound("ding.mp3");

  
  

}

function setup(){
  
  createCanvas(600,300);
  
  
  //add sound
  creepySound.loop();
  
  grave = createSprite(300, 300);
  grave.addImage("graveyard",graveImage);
  grave.scale = 1.5
  
  girl = createSprite(40, 240);
  girl.addImage("girl", girlImage);
  girl.scale = 0.4
  
  killer = createSprite(555, 210);
  killer.addImage("killer", killerImage);
  killer.scale = 0.4
  killer.velocityX =-0.2
  
  //create ground
  ground = createSprite(300, 295, 600, 10);
  ground.shapeColor = "saddlebrown";
  
  //create helpers and knife groups
  helpersGroup = createGroup();
  knivesGroup = createGroup();
  
  score = 0;
  
}

function draw(){
  
  background("grey");

   if (gameState === "PLAY"){
     
  //create moving background
  grave.velocityX = -3;
  
  if (grave.x < 200){
      grave.x = grave.width/2;
    }
  
  //make girl collide with the ground
  girl.collide(ground)
 
  //give girl controls
  //jump when the space key is pressed
    if(keyDown("space") && girl.y >= 150) {
        girl.velocityY = -14;
    }
  
  
  if (keyDown ("RIGHT_ARROW")){
  
    girl.x = girl.x + 4
  }
  
  if (keyDown ("LEFT_ARROW")){
  
    girl.x = girl.x - 4
  }
    
  //add gravity
  girl.velocityY = girl.velocityY + 0.8
  
  
  //call functions
  spawnHelpers();
  knives();
  
  //increase score if girl is touching helpers
    if(girl.isTouching(helpersGroup)){
      helpersGroup.destroyEach();
      
      score = score +2
     
      //add sound
      ding.play();
  
    }
     
  
  if(girl.isTouching(knivesGroup) || girl.isTouching(killer)){
    
  
    gameState = "END"
    
    //add sound
    evilLaugh.play();
    
   
  }
  
   if(score === 6){
    
  
    gameState = "WIN"
     
    //stop background sound
    creepySound.stop();
     
    //add sound
    suspense.play();
    
   
  }


    drawSprites();
    
   //displaying score
  stroke ("red");
  textFont('Fantasy')
  textSize(20);
  fill("maroon");
  text("SCORE: "+ score, 500,30);

  
  //display survival time
  stroke ("red");
  textFont('Fantasy')
  textSize(20);
  fill("maroon");
  survivalTime =Math.ceil(frameCount/frameRate())
  text("SURVIVAL TIME:" + survivalTime, 10, 30);
     
}
  
   if(gameState==="WIN"){
    
    
    stroke("red");
    fill("maroon");
    textSize(40);
    textFont("Fantasy");
    text("YOU'VE MADE IT TO SAFETY!", 100, 120);
     
    stroke("red");
    fill("maroon");
    textSize(30);
    textFont("Fantasy");
    text("YOU WIN", 230, 180);
     
    
  }
  
   if(gameState==="END"){
    
    
    //stop background sound
    creepySound.stop();
     
    stroke("red");
    fill("maroon");
    textSize(60);
    textFont("Fantasy");
    text("TOO LATE!", 180, 120);
     
    stroke("red");
    fill("maroon");
    textSize(30);
    textFont("Fantasy");
    text("GAME OVER", 210, 180);
     
    
  }
  
}

function spawnHelpers(){
 if (frameCount % 150 === 0){
   var helper = createSprite(400,225);
   
    //generate random helpers
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: helper.addImage("bandaid", bandaidImage);
              break;
      case 2: helper.addImage("phone", phoneImage);
              break;
      default: break;
    }
   
    //random y position
    helper.y = Math.round(random(50,100));
   
      //change position of helpers
      position =Math.round(random(1,2));
    if (position == 1)
    {
      helper.x=400
      helper.velocityX= -(3)
    } 
    else if (position == 2) 
    {
      helper.x=0
      helper.velocityX= (3)
    }
   
    //assign scale and lifetime to the helper     
    helper.scale = 0.2;
    helper.lifetime = 300;
   
   //add each helper to the group
    helpersGroup.add(helper);
 }
}



function knives(){
  if(World.frameCount % 250 === 0){
    knife = createSprite(400, 200, 20, 20);
    knife.addImage(knifeImage);
    
    //random y position
    knife.y =Math.round(random(230,250));
    
      //change position of knives
      position =Math.round(random(1,2));
    if (position == 1)
    {
      knife.x=400
      knife.velocityX= -(3)
    } 
    else if (position == 2) 
    {
      knife.x=0
      knife.velocityX= (3)
    }
   
    
    //set lifetime
    knife.setLifetime = 300;
    
    //set scale
    knife.scale= 0.1;
    
    //add knife to knives group
    knivesGroup.add(knife);
    
    
  }

}




