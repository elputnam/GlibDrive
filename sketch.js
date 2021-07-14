let heartRate = [];
let B = 0;
let list1 = [];
let sec = 0;
let txt = [];
let j = 0;
let colA = 0;
let colB = 300;
let tau = 0;



let swarm = [];
var num;
//let H3 = 0;

//let link;
//let next; 
//let link1;
//let link2;
//let link3;


function preload(){
  //Load list of json file names
  list1 = loadStrings('glibDriveList.txt');
  txt = loadStrings('glibDrive.txt');
  //heartRate = loadJSON('data/heart_rate-2020-05-01.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(20);
  num = height*.3;
  j = 0;
  //console.log(list1);
  //call random file name (not working)
  let day = int(random(1,131));
  heartRate = loadJSON(list1[day]);
  //heartRate = loadJSON(list1[10]);
  console.log(list1[day]);
  //console.log(list1[10]);
  //heartRate = loadJSON('data/heart_rate-2020-05-01.json')
  
  for (let i = 0; i < num; i++){
    swarm.push(new Element())
  }


  
  //link = createA('http://127.0.0.1:5501/AtTheEndOf/', '');
  //link1 = createA('http://127.0.0.1:5501/PeatBramble/', '');
  //link2 = createA('http://127.0.0.1:5501/AtTheEndOf/', '');
}

function draw() {
  background(random(30), 10);
  //heartFetch();
  // debugger
  print(frameCount);
  if (frameCount >= 175){
    bpm = heartRate[B].value['bpm'];
    colA = map(bpm, 60, 170, 0, 360);
    colB = map(bpm, 60, 170, 360, 0);
    B += 1;

    push();
    let inc = random(-2,2);
    translate(width*.5+inc, height*.5+inc);
    inc += inc;
    let num = 300;
    tau = (360/num) * (frameCount % num);
    screens();
    pop();
  }
  
  //choice
  /*
  let choice = int(random(0, 2));;  
  if ( choice == 0){
     link = link1;
      }
  if (choice == 1){
      link = link2;
    }*/  
/*
if (frameCount == 500){
  next = createButton('next').parent(link); 
  next.position(width*.25, height*.75);
}*/



  //circleSwarm
  for (let i = 0; i < swarm.length; i++){
    noStroke();
    //color blend based on mouse location
    let col1 = map(mouseX, 0, width, 0, 360);
    let col2 = map(mouseY, 0, height, 360, 0);
    let blender = map(mouseX, 0, width, 0, 1);
    let H3 = lerp(col1, col2, blender);
    fill(H3, random(100), random(100))
    swarm[i].oscillate();
    swarm[i].display();
    }
    /*    
    H3 += 1;
    if (H3 >= 360){
      H3 = 0;
  }*/
  glibDriveText();
}


function screens(){
  //shape 1
  strokeWeight(1);
  push();
  //let H1 = (map(mouseX, 0, width, 300, 200));
  rotate(radians(-tau));
  stroke(colA, 100, 100);
  overlay();
  pop();

  //shape 2
  push();
  //let H2 = (map(mouseX, 0, height, 250, 340));
  stroke(colB, random(100), random(100));
  scale(0.65);
  rotate(radians(tau));
  overlay();
  pop();
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
    ellipse(mouseX + x, mouseY + y, random(10));
 }
}
