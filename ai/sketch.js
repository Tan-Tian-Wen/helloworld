var s = [];
var values;
var gravity = 0.0;
var num =86;
var cv;
var p;
function preload() {
	 values = loadJSON("assets/output.json");
}

function setup() {
cv=createCanvas(1500, 3500,P2D);

	background(255);
 p=loadImage("assets/1.png");

	var birds = values.birds;

	for (var i = 0; i < num; i++) {
		var group = birds[i].group;
		var size = birds[i].size;
		var name = birds[i].id;
		s[i] = new Spring2D(size * 70, size * 30, group, birds[i].colorIn, birds[i].colorOut, name,birds[i].description,birds[i].link);
	}
}

function draw() {

	background(21,20,51);
//ellipse(width/2,height/2,200,200);

imageMode(CENTER);
image(p,width/2,200);

textAlign(LEFT, LEFT);
textSize(20);
//text("人工智能\n行业分析图", 40, 80);
	textAlign(CENTER, CENTER);
	for (var i = 0; i < s.length; i++) {
		for (var j = 0; j < s.length; j++) {
			if (i != j) {
				var force = s[j].attract(s[i]);
				//print(force);
				s[i].applyForce(force);
			}
		}
		var sn = s[i].returnN();
		if (sn > 0) {
			s[i].update(s[sn].loc.x, s[sn].loc.y);
		}else{
			s[i].update(s[1].loc.x, s[1].loc.y);
		}
	}
	
	for (var j = s.length-1; j >=0 ; j--) {
	
   s[j].show();
}
 	for (var j =0; j< s.length ; j++) {
   	s[j].textShow();
 }
}


function mousePressed() {
	for (var i = 0; i < num; i++) {
		s[i].pressed();
	}
}

function mouseReleased() {
	for (var i = 0; i < num; i++) {
		s[i].released();
	}
}