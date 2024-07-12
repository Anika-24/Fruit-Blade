//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,imp,cap;


function preload(){
  
  img = createCapture(VIDEO);
  img.size(750, 600);
  img.position(750, 0);
  img.hide();
  
  gameOverSound=loadSound("gameover.mp3");
  swordSound=loadSound("SwooshSound.mp3");
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  
}



function setup() {
  
  createCanvas(600, 600);
  
  //createCanvas(750, 600);
  colorMode(HSB);
  slider = createSlider(0, 360, 60, 40);
  slider.position(10, 10);
  slider.style('width', '80px');

  
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background(61,129,300);
    let val = slider.value();
 
  background(255, val, val, 1);
  
  let cap = img.get();
  for (let x = 0; x < img.width; x += 10) {
    for (let y = 0; y < img.width; y += 10) {
      let c = img.get(x, y);


      fill(val, 100, 100, 1);

      //fill('white');

      noStroke();



      let brit = int(brightness(img.get(x, y)));



      if (brit >= 0 && brit <= 10) {
        updateText('.', x, y);

      } else if (brit >= 11 && brit <= 20) {
        updateText('*', x, y);

      } else if (brit >= 21 && brit <= 30) {
        updateText('!', x, y);

      } else if (brit >= 31 && brit <= 40) {
        updateText('/', x, y);

      } else if (brit >= 41 && brit <= 50) {
        updateText('+', x, y);

      } else if (brit >= 51 && brit <= 60) {
        updateText('=', x, y);
   
      } else if (brit >= 61 && brit <= 70) {
        updateText('o', x, y);

      } else if (brit >= 71 && brit <= 90) {
        updateText('O', x, y);

      } else if (brit >= 91 && brit <= 100) {
        updateText('@', x, y);
    
      }


    }

  }


  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      swordSound.play();
      fruitGroup.destroyEach();
      score=score+1;
      
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        //gameOverImage.scale=5;
        sword.addImage(gameOverImage);
       sword.x=250;
        sword.y=250;
        gameOverSound.play();
      }
    }
  }
  
  drawSprites();
  
  //Display score
  textFont("monospace",20)
  text("Score : "+ score,300,30);
  textFont("serif", 12)
  text("Adjust to change background color",12,40)
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-(7+(score/2));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
function updateText(word, a, b) {
  textSize(8);
  text(word, a, b);
}

//increase speed of the fruits once score=4.



