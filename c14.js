var gameOver , gameOverImg;
var play = 1;
var END = 0;
var gameState = 1;

var score;

function preload(){
  knife_image = loadImage("knife.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  monsterImage = loadAnimation("alien1.png", "alien2.png");

  gameOverImage = loadImage("gameOver.png");

}

function setup() {
  
  // To create a canvas
createCanvas(400,400);

knife = createSprite(200, 200, 10, 10);
knife.addImage(knife_image);
knife.scale = 0.7;

knife.setCollider("circle", 0, 0, 20);

//To create new Groups
fruitGroup = new Group();
enemyGroup = new Group();

score = 0;



}

function draw() {
  background("yellow");

  if(gameState === play) {
    fruits();
    enemy();

    //To make knife move along the mouse in all directions
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    if(fruitGroup.isTouching(knife)) {

      fruitGroup.destroyEach();
      score = score + 2;
    } else {
      if(enemyGroup.isTouching(knife)) {
        gameState === END;

        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityEach(0);
        enemyGroup.setVelocityEach(0);
        knife.addImage(gameOverImage);
        knife.x = 200;
        knife.y = 200;

        score = 0;
      }
    }
  }
  drawSprites();
  //Display score
  Text("Score : " + score, 300, 30);
}
function fruits() {
  //To make it visible after every 80 frames 
  if (World.frameCount % 80 === 0) {
    //To create fruit sprite
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.17;
    //fruit.debug=true;

    r = Math.round(random(1, 4));

    if (r === 1) {
      fruit.addImage(fruit1);
    } else if (r === 2) {
      fruit.addImage(fruit2);
    } else if (r === 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }


    //To place fruit randomly in vertical position
    fruit.y = Math.round(random(50, 340));

    //To assign velocity to fruit
    fruit.velocityX = -7;
    //To assign lifetime to fruit to avoid memory leaks
    fruit.setLifetime = 100;

    //To add fruit in fruitGroup
    fruitGroup.add(fruit);
  }

}

function enemy() {
  //To make monster appear after every 200 frames
  if (World.frameCount % 200 === 0) {
    //To create monster sprite
    var monster = createSprite(400, 200, 20, 20);
    //To place it randomly on y axis/vertical position
    monster.y = Math.round(random(50, 350));
    //To add animation
    monster.addAnimation("moving", monsterImage);

    monster.velocityX = -8;
    //To assign lifetime to avoid memory leaks
    monster.setLifetime = 50;
    //To add monster in enemyGroup
    enemyGroup.add(monster);
  }








}