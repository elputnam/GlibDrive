let heartRate;
let list1 = [];

let swarm = [];
var num;
let H3 = 0;

let link;
let next; 
//let link1;
//let link2;
//let link3;

function preload(){

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(20);
  num = height*.3
  for (let i = 0; i < num; i++){
    swarm.push(new Element())
  }
  link = createA('http://127.0.0.1:5501/AtTheEndOf/', '');
  //link1 = createA('http://127.0.0.1:5501/PeatBramble/', '');
  //link2 = createA('http://127.0.0.1:5501/AtTheEndOf/', '');
}

function draw() {
  background(random(30), 3);
  //choice
  /*
  let choice = int(random(0, 2));;  
  if ( choice == 0){
     link = link1;
      }
  if (choice == 1){
      link = link2;
    }*/  

if (frameCount == 500){
  next = createButton('next').parent(link); 
  next.position(width*.25, height*.75);
}

  push();
  let inc = random(-2,2);
  translate(width*.5+inc, height*.5+inc);
  inc += inc;
  let num = 300;
  let tau = (360/num) * (frameCount % num);

  //shape 1
  strokeWeight(1);
  push();
  let H1 = (map(mouseX, 0, width, 300, 200));
  rotate(radians(-tau));
  stroke(H1, 100, 100);
  overlay();
  pop();

  //shape 2
  push();
  let H2 = (map(mouseY, 0, height, 50, 150));
  stroke(H2, random(100), random(100));
  scale(0.65);
  rotate(radians(tau));
  overlay();
  pop();
  pop();

  for (let i = 0; i < swarm.length; i++){
    noStroke();

    fill(H3, random(100), random(100))
    swarm[i].oscillate();
    swarm[i].display();

    }
        
    H3 += 1;
    if (H3 >= 360){
      H3 = 0;
  }
  
}
function overlay(){
  let w = width - (200);
  let h = height - (200);
  for (let i = -w / 2; i < w/2; i+=5){

    line(i, -h /2 , i, h/2 );
  }
}

class Element{
  constructor(){
    this.angle = createVector();
    this.vel = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amp = createVector(random(20, width), random(20, height));
  }

  oscillate() {
    this.angle.add(this.vel);
  }

  display() {
    let x = sin(this.angle.x) * this.amp.x;
    let y = sin(this.angle.y) * this.amp.y;

    ;
    ellipse(mouseX + x, mouseY + y, random(10));
}
}