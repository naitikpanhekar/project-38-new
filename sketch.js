//Create variables here
var dog,sadDog,happyDog;
var foodS,foodStock;
var food,foodstock;
var fedtime,lastfed,feed,addFood;

function preload()
{
	//load images here
  sadDog=loadImage("Images/Dog.png")
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database()
	createCanvas(1000, 400);
  
  foodObj = new Food();

  foodStock = firebase.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedtime.on("value", function (data){
    lastfed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %2 + "PM",350,30);
  }
  else if(lastFed == 0) {
    text("Last Feed : 12AM", 350,30);
  }
  else {
    text("Last Feed: " + "AM", 350,30);
  }

  drawSprites();
  //add styles here

}

//function to read stock
function readStock(data) {
  food = data.val();
  foodObj.updateFooodStock(foods);
}

//function to updata food stock and last fed time
  function feedDog() {
    dog,addImage(happyDog);

    foodObj.updateFooodStock(foodObj.getFoodstock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodstock(),
      FeedTime : hour()
    })
  }

//function to add food in stock
function addFoods(){
  food++;
  database.ref('/').update({
    Food: foodS
  })
}
 




