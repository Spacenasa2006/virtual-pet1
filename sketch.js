var dog,dim1,dim2;
var database;
var foods,foodstock;
function preload()
{
  dim1=loadImage("images/dogImg.png")
  dim2=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  dog=createSprite(250,300,150,150)
  dog.addImage(dim1)
  dog.scale=0.15;
  foodstock=database.ref("food")
  foodstock.on("value",readstock)
  textSize(20)
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writestock(foods)
    dog.addImage(dim2)
  }
  drawSprites();
  fill(255,255,254)
  stroke("black")
  text("food remaining"+foods,170,200)
  textSize(13)
  text("Press up arrow to feed",130,10,300,20)
}
function readstock(data){
    foods=data.val()
}
function writestock(x){
    if(x<=0){
      x=0
    }
    else{
      x=x-1
    }
    database.ref("/").update({
      food:x
    })
}

