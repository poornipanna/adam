var adam, bush, key, score, enemy,life, gameState, lestArrow, rightArrow, gameOver, replay;
var groundGroup, platformGroup, invisiblePlatformGroup, bushGroup, keyGroup,coinGroup, bubbleGroup;
var platform, invisiblePlatform, bubble; 
function preload(){
  BGImage=loadImage("images/BG.png");
  RunImage=loadAnimation("images/Run/Run1.png","images/Run/Run2.png","images/Run/Run3.png","images/Run/Run4.png","images/Run/Run5.png",
  "images/Run/Run6.png","images/Run/Run7.png","images/Run/Run8.png","images/Run/Run9.png","images/Run/Run10.png"
  );
  /*DeadImage=loadAnimation("images/Dead/Dead1.png","images/Dead/Dead2.png","images/Dead/Dead3.png","images/Dead/Dead4.png","images/Dead/Dead5.png",
  "images/Dead/Dead6.png","images/Dead/Dead7.png","images/Dead/Dead8.png","images/Dead/Dead9.png","images/Dead/Dead10.png",
  );*/
  JumpImage=loadAnimation("images/Jump/Jump1.png","images/Jump/Jump2.png","images/Jump/Jump3.png","images/Jump/Jump4.png","images/Jump/Jump5.png",
  "images/Jump/Jump6.png","images/Jump/Jump7.png","images/Jump/Jump8.png","images/Jump/Jump9.png","images/Jump/Jump10.png"
  );
  IdleImage=loadAnimation("images/Idle/Idle1.png");
  
  /*SlideImage=loadAnimation("images/Slide/Slide1.png","images/Slide/Slide2.png","images/Slide/Slide3.png","images/Slide/Slide4.png","images/Slide/Slide5.png",
  "images/Slide/Slide6.png","images/Slide/Slide7.png","images/Slide/Slide8.png","images/Slide/Slide9.png","images/Slide/Slide10.png",
  );*/

  CoinImage=loadAnimation("images/Coin/Coin1.png","images/Coin/Coin2.png","images/Coin/Coin3.png","images/Coin/Coin4.png","images/Coin/Coin5.png",
  "images/Coin/Coin6.png",)

  enemyImage=loadAnimation("images/Jinn/Flight1.png","images/Jinn/Flight2.png","images/Jinn/Flight3.png","images/Jinn/Flight4.png")

  groundImage=loadImage("images/Tile/1.png"); 

  platformImage=loadImage("images/Tile/14.png");

  bushImage=loadImage("images/objects/Bush.png");

  keyImage=loadImage("images/objects/Key.png");

  lifeImage=loadImage("images/objects/Life.png");

  bubbleImage=loadImage("images/objects/Bubble.png");

  gameOverImage=loadImage("images/gameOver.png");
  replayImage=loadImage('images/replay.png');

  jumpSound=loadSound('sound/jump.wav');
  endSound=loadSound('sound/end.wav');
  obstacleSound=loadSound('sound/obstacle.wav');
  enemySound=loadSound('sound/enemy.wav');
  clickSound=loadSound('sound/buttonCLick.wav');
  coinSound=loadSound('sound/coinIt.wav');
}
function setup() {
  createCanvas(displayWidth, displayHeight-170);
  console.log(displayWidth);
  adam=createSprite(displayWidth/2,displayHeight.y-5,100,100);
  adam.addAnimation("Run",RunImage);
  adam.addAnimation("idle",IdleImage);
  adam.addAnimation("Jump",JumpImage);
  adam.scale=0.2;


  adam.x= mouseX;
  adam.y= mouseY
  groundGroup =new Group(); 
  platformGroup= new Group();
  invisiblePlatformGroup= new Group();
  bushGroup= new Group();
  keyGroup = new Group();
  coinGroup= new Group();
  bubbleGroup = new Group();

    ground=createSprite(displayWidth/2,displayHeight-100,displayWidth,50);
    ground.addImage("groundImage", groundImage);
    ground.velocityX=-6;
    ground.scale=2.2;

    score=0;

    life1=createSprite(100,70,40,40);
    life1.addImage('life', lifeImage);
    life1.scale=0.5;

    life2=createSprite(160,70,40,40);
    life2.addImage('life', lifeImage);
    life2.scale=0.5;

    life3=createSprite(220,70,40,40);
    life3.addImage('life', lifeImage);
    life3.scale=0.5;
    life=3;

    enemy=createSprite(500,500);
    enemy.addAnimation("Jinn", enemyImage);
    enemy.scale=1.2;
    enemy.velocityX=-10
    enemy.velocityY=-10
    enemy.setCollider('rectangle',0,0,20,50);
    enemy.velocityX=10;
    enemy.velocityY= -10;

    gameOver=createSprite(displayWidth/2,displayHeight/2-150,100,100);
    gameOver.addImage('end', gameOverImage);
    gameOver.visible=false;

    replay=createSprite(displayWidth/2,displayHeight/2,40,40);
    replay.addImage('reload',replayImage);
    replay.visible=false;
  

    gameState="play";

    platform=createSprite(displayWidth/2,displayHeight/2);
    platform.addImage("Platform", platformImage);
  //  platform.velocityX=-3;
   // platform.y=Math.round(random(250,400));
    platform.scale=0.2;
    platformGroup.add(platform);

    invisiblePlatform=createSprite(displayWidth/2,platform.y-5,60,10);
  ////  invisiblePlatform.velocityX=-3;
    invisiblePlatform.visible=false;
    invisiblePlatformGroup.add(invisiblePlatform);
   invisiblePlatform.debug = true;
   bubble=createSprite(platform.x,platform.y-50,50,50);
   bubble.addImage('bubble', bubbleImage);
 //  bubble.velocityX=-3;
   bubble.scale=1.2;
   bubbleGroup.add(bubble);
   adam.collide(invisiblePlatformGroup)

}
function draw() {
  background(BGImage);
  edges=createEdgeSprites();
  adam.collide(edges[0]);
  adam.collide(edges[1]);
  adam.collide(edges[2]);
  adam.collide(edges[3]);

  enemy.bounceOff(edges[0]);
  enemy.bounceOff(edges[1]);
  enemy.bounceOff(edges[2]);
  enemy.bounceOff(edges[3]);
  //enemy.bounceOff(bubbleGroup);
  

  textFont('Jokerman');
  textSize(40);
  fill('black');
  stroke('white');
  text('SCORE: '+score, 800,100);

  if(gameState==="play"){
  
  if(enemy.bounceOff(bubbleGroup)){
    enemy.velocityX=-10;
    enemy.velocityY= 10;
  }
  if(enemy.bounceOff(ground)){
    enemy.velocityX=10;
    enemy.velocityY= -10;
  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if(keyDown(LEFT_ARROW)){
    adam.x=adam.x-10
    adam.changeAnimation("Run",RunImage);
  }

  if(keyDown(RIGHT_ARROW)){
    adam.x=adam.x+10;
    adam.changeAnimation("Run",RunImage);
  }

  if (keyDown("space")) { 
       adam.velocityY=-15;
       adam.changeAnimation("Jump",JumpImage);
       jumpSound.play();
    }

    if(touches.length>0){
      if(adam.overlapPoint(touches[0].x,touches[0].y)){
      adam.velocityY=-15;
      adam.changeAnimation("Jump",JumpImage);
      touches = []; 
    }
  }

 adam.velocityY=adam.velocityY+1;

 for (var i=0;i<coinGroup.length;i=i+1){
   if(coinGroup.get(i).isTouching(adam)){
     coinGroup.get(i).destroy()
     score=score+1
     coinSound.play();
   }
 }
 if(adam.isTouching(invisiblePlatformGroup)){
  adam.changeAnimation("idle",IdleImage);
}

 if(enemy.collide(adam)){
  
   life=life-1;
   console.log("life " + life);
   enemy.velocityX=-10;
   enemy.velocityY=-10;
   adam.x=300;
   adam.y=400;
   enemySound.play();
   
 }

if(bushGroup.collide(adam)){
   life=life-1;
   obstacleSound.play();
   bushGroup.destroyEach();
}

 if(life===3){
  life1.visible=true;
  life2.visible=true;
  life3.visible=true;
  }
  if(life===2){
   life1.visible=true;
   life2.visible=true;
   life3.visible=false;
  }

  if(life===1){
   life1.visible=true;
  life2.visible=false;
  life3.visible=false;
  }
  if(life===0){
   life1.visible=false;
  life2.visible=false;
  life3.visible=false;
  gameState='end';
  endSound.play();
  }


 // spawnPlatform();
  //spawnGround();
  spawnBush();
  spawnCoin();
}else if(gameState==='end'){

adam.velocityX=0;
adam.velocityY=0;
adam.changeAnimation('idle', IdleImage);
ground.velocityX=0;
platformGroup.destroyEach();
coinGroup.destroyEach();
enemy.velocityX=0;
enemy.velocityY=0;
enemy.animation.looping=false;
invisiblePlatformGroup.destroyEach();
bubbleGroup.destroyEach();
bushGroup.destroyEach();
gameOver.visible=true;
replay.visible=true;
enemy.y=displayHeight/2-100;



if(mousePressedOver(replay) || touches.length>0){
  if(replay.overlapPoint(touches[0].x,touches[0].y)){
    adam.velocityY=-15;
    adam.changeAnimation("Jump",JumpImage);
    touches = []; 
  }
  gameState='play';
  gameOver.visible=false;
  replay.visible=false;
  score=0;
  ground.velocityX=-6;
  life=3;
  enemy.velocityX=-10;
  enemy.velocityY=-10;
  adam.x=displayHeight/2;
  adam.y=displayWidth/2;
}
if(touches.length>0){
  if(replay.overlapPoint(touches[0].x,touches[0].y)){
    gameState='play';
    gameOver.visible=false;
    replay.visible=false;
    score=0;
    ground.velocityX=-6;
    life=3;
    enemy.velocityX=-10;
    enemy.velocityY=-10;
    adam.x=displayHeight/2;
    adam.y=displayWidth/2;

  }
}

}



  drawSprites();
  adam.collide(ground);
  adam.collide(platformGroup);
  adam.collide(bushGroup);

}

function spawnGround(){
  if(frameCount%100===0){
    var ground=createSprite(displayWidth,600,70,50);
    ground.addImage("groundImage", groundImage);
    ground.velocityX=-1;
    groundGroup.add(ground);
  }
}

function spawnPlatform(){
  if(frameCount%300===0){
    var platform=createSprite(displayWidth,350,40,30);
    platform.addImage("Platform", platformImage);
    platform.velocityX=-3;
    platform.y=Math.round(random(250,400));
    platform.scale=0.4;
    platformGroup.add(platform);

    var invisiblePlatform=createSprite(displayWidth,platform.y-40,250,30);
    invisiblePlatform.velocityX=-3;
    invisiblePlatform.visible=false;
    invisiblePlatformGroup.add(invisiblePlatform);

   var bubble=createSprite(platform.x,platform.y-50,50,50);
   bubble.addImage('bubble', bubbleImage);
   bubble.velocityX=-3;
   bubble.scale=2;
   bubbleGroup.add(bubble);
   

    /*var key=createSprite(displayWidth,platform.y-40,250,30);
    key.addImage("key",keyImage);
    key.velocityX=-3;
    key.scale=0.5;
    keyGroup.add(key);*/
  }
}

function spawnBush(){
  if(frameCount%200===0){
    var bush=createSprite(displayWidth,displayHeight/2+750,20,20);
    bush.addImage("Bush", bushImage);
    bush.velocityX=-6;
    bush.scale=1.5;
    bushGroup.add(bush);
  }
}

function spawnCoin(){
  if(frameCount%20===0){
var coin=createSprite(displayWidth/2,0,20,20);
coin.addAnimation("coin",CoinImage);
coin.scale=0.3;
coin.x=Math.round(random(100,displayWidth-100));
coin.velocityY=4;
coin.depth=ground.depth;
coin.depth=coin.depth-1;
coinGroup.add(coin);
}}