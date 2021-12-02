var font;
var density = 0.28;
var vehicles = [];
var txt1 = "typographics";
var txt2 = "let's talk type";
var textBool = true;
var mouseClicks = 0;

let img;

function preload() {
  img = loadImage('Website Final.png');
  
  font = loadFont('Bebas.ttf');
  font2 = loadFont('BebasBook.ttf');
}

function setup() {
  createCanvas(1920, 6000);
  textAlign(CENTER);

  
  var points = font.textToPoints(txt1, 170, 550, 360, {
    sampleFactor: density
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    }
  
}

function draw() {
  background(0);
  
  image(img, 0, 1080, 1920, 4920);
  
  push();
  
  noStroke();
  textAlign(NORMAL);
  fill(255);
  textSize(22);
  textFont(font2);
  text('PRESS MOUSE AND ENTER', 1730, 30)
  text('FOR PARTICLE INTERACTION', 1730, 50)
  
  textAlign(CENTER);
  textSize(50);
  textFont(font);
  fill(255);
  text('ABOUT', 384, 800);
  fill(255);
  text('CONFERENCE', 768, 800);
  fill(255);
  text('WORKSHOPS', 1152, 800);
  fill(255);
  text('TYPELABS', 1536, 800);
  
  pop();
      
  for (var i = 0; i < vehicles.length; i++) {
    col = color(255);
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.setColor(col);
    v.show();
  }
}

function word1Update() {
  txt1 = word1.value();
}

function mousePressed(){
  if (mouseX < 1920 && mouseY < 1080){
    if (mouseClicks <= 5) {
      for (var i = 0; i < vehicles.length; i++){
        var v = vehicles[i];
        v.newTarget(random(0, 1920), random(0, 1080));
      }
    }
    mouseClicks++;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
      if (!textBool) {
        var points = font.textToPoints(txt2, 160, 550, 330, {
          sampleFactor: density
        });
        textBool = true;

        if (points.length > vehicles.length) {
          for (var i =0; i < vehicles.length; i++) {
              var pt = points[i];
              var v = vehicles[i];
              v.newTarget(pt.x, pt.y);
            }
            for (var i = vehicles.length; i < points.length; i++) {
              var pt = points[i];
              var vehicle = new Vehicle(pt.x, pt.y);
              vehicles.push(vehicle);
              }
        } else if (points.length < vehicles.length){
          for (var i = points.length; i < vehicles.length; i++) {
            var v = vehicles[i];
            v.newTarget(0, 0);
            }
            for (var i =0; i < points.length; i++) {
            var pt = points[i];
            var v = vehicles[i];
            v.newTarget(pt.x, pt.y);
          }
        } else {
            for (var i =0; i < points.length; i++) {
            var pt = points[i];
            var v = vehicles[i];
            v.newTarget(pt.x, pt.y);
          }
       }
     }

     else {
      var points = font.textToPoints(txt1, 170, 550, 360, {
        sampleFactor: density
      });
      textBool = false;

      if (points.length > vehicles.length) {
        for (var i =0; i < vehicles.length; i++) {
            var pt = points[i];
            var v = vehicles[i];
            v.newTarget(pt.x, pt.y);
          }
          for (var i = vehicles.length; i < points.length; i++) {
            var pt = points[i];
            var vehicle = new Vehicle(pt.x, pt.y);
            vehicles.push(vehicle);
            }
      } else if (points.length < vehicles.length) {
        for (var i = vehicles.length; i > points.length; i--) {
          var v = vehicles[i];
          v.newTarget(pt.x, pt.y);
          }
          for (var i =0; i < points.length; i++) {
          var pt = points[i];
          var v = vehicles[i];
          v.newTarget(pt.x, pt.y);
        }
      } else {
      for (var i =0; i < points.length; i++) {
          var pt = points[i];
          var v = vehicles[i];
          v.newTarget(pt.x, pt.y);
        }
     }
    }
  }
}