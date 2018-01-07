/*
 Andor Salga
 
 */

class Blob {
  PVector pos;
  PVector vel;
  PVector acc;
  float targetX;
	float targetY;
	float r;
	string s;
  Blob(float tx,float ty,float r_,string s_) {
    pos = new PVector(width/2+random(-100,100), height/2+random(-100,100));
    vel = new PVector();
    acc = new PVector();
		targetX=tx;
		targetY=ty;
		r=r_;
		s=s_;
  }

  PVector limit(PVector p, float maximum) {
    float m = p.mag();
    PVector ret = p.get();
    
    if (m > maximum) {
      ret.normalize();
      ret.mult(maximum);
    }
    return ret;
  }

  void update() {
    PVector posToCursor = new PVector(targetX-pos.x, targetY-pos.y);
    posToCursor.normalize();
    posToCursor.mult(0.4f);

    acc.x = posToCursor.x;
    acc.y = posToCursor.y;

    vel.x += acc.x;
    vel.y += acc.y;

    vel = limit(vel,5);

    pos.x += vel.x;
    pos.y += vel.y;

    acc.mult(0);
		text(s,pos.x,pos.y);
  }
	void displayText() {
		text(s,pos.x,pos.y);
  }
}

PImage img;
ArrayList <Blob> blobs;
string aboutme=["UCD","Coding","AI",null,
								"Cat","Cooking","Art","VUI","AR",null,"Travel","UX Design","Curation","Painting"];
int a=0;
boolean click=false;
int b=0;
int ori=4;
float t=25;
float c = 0;
float cc = 0;
float co = 0;
void setup() {
  size(700, 400,P2D);
  smooth();
  img = createImage(width, height, RGB);
  blobs = new ArrayList<Blob>();

  for (int i = 0; i < ori; i++) {
    Blob b = new Blob(width/2,height/2,100,null);
    blobs.add(b);
  }
}

void update() {
  for (int i = 0; i < blobs.size(); i++) {
    Blob b = blobs.get(i);
    b.update();
  }
}

void draw() {
  update();


  for (int i = 0; i < img.pixels.length; i++) {
    int x = i % width;
    int y = i / width;

    
    float c = 0;
    for (int b = 0; b < blobs.size(); b++) {
      Blob blob = blobs.get(b);
     
      float distance = dist(x, y, blob.pos.x, blob.pos.y);
			
      c += blob.r/distance * 50.0;
			
		  
		
			
    }

    //c = c >= 255 ? 255 :c;
     // c+=(cc-c)*0.01; 
		if(c>255){
			c=color(250+sin(frameCount/100)*100,230,cos(frameCount/100)*100+270);
		}else{
			c=255;
		}
    img.pixels[i] = color(c);
  }

  img.updatePixels();
  image(img, 0, 0);
	textAlign(CENTER);
	
	textSize(20);
	text("About Me",(blobs.get(0).pos.x+blobs.get(1).pos.x+blobs.get(2).pos.x)/3,(blobs.get(0).pos.y+blobs.get(1).pos.y+blobs.get(2).pos.y)/3);
	textSize(15);
	// if(click!=true){
	// 	fill(255,sin(frameCount/5)*100+200);
	// text("Click me to find out",(blobs.get(0).pos.x+blobs.get(1).pos.x+blobs.get(2).pos.x)/3,(blobs.get(0).pos.y+blobs.get(1).pos.y+blobs.get(2).pos.y)/3+20);
	// }
	fill(255);
	
if(blobs.size()>ori){
	
		for(int i=0;i<blobs.size()-ori;i++){
		  Blob blob = blobs.get(ori+i);
		  textSize(15);
			fill(255);
			blob.displayText();
	}
	}
}
void mousePressed(){
	click=true;
	float raY=random(-30*height,height*30);
	float raX=random(width*30,-width*30);
	for (int b = ori; b < blobs.size(); b++) {
      Blob blob = blobs.get(b);
		  
			if(blob.pos.y<-100||blob.pos.y>height+100||blob.pos.x>width+100||blob.pos.x<-100){
				blobs.remove(b);
			 
			}
			
    }
	Blob d = new Blob(raX,raY,30+.6*textWidth(aboutme[a]),aboutme[a]);
    blobs.add(d);
	if(random(10)>8){
	Blob d = new Blob(raX+random(-100,100),raY+random(-100,100),20,null);
	}
    blobs.add(d);
	
	if(a>aboutme.length-1){
		a=0;
	}else{
	  a++;
	}
}