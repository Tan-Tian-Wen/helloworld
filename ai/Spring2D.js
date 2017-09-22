function Spring2D(length_, b_, n_, inside_, outside_, string_, string2_, string3_) {

	this.vx = 0;
	this.vy = 0;
	this.tx, this.ty; // The x- and y-axis velocities
	this.x, this.y; // The x- and y-coordinates
	this.mass;
	this.link = string3_;
	this.intro = string2_;

	this.over = false;
	this.move = false;

	this.string;
	this.springLength;


	this.springLength = length_;
	this.x = width / 2 + random(-15, 15);
	this.y = height / 2 + random(-15, 15);
	this.n = n_;
	this.string = string_;
	this.radius = b_;
	this.mass = this.radius / 6;

	this.outside = outside_;
	this.inside = inside_;
	this.loc = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.f = createVector(0, 0);


	this.attract = function(m) {
		this.location2 = createVector(m.loc.x, m.loc.y);
		this.loc = createVector(this.loc.x, this.loc.y);
		this.force = p5.Vector.sub(this.loc, this.location2); // Calculate direction of force
		this.distance = this.force.mag(); // Distance between objects

		if (this.distance < 180) {
			this.distance = constrain(this.distance, 2, 4000.0); // Limiting the distance to eliminate "extreme" results for very close or very far objects
			this.force.normalize(); // Normalize vector (distance doesn't matter here, we just want this vector for direction

			this.g = 4.5;
			this.strength = -(this.g * this.mass * this.mass) / (this.distance * this.distance); // Calculate gravitional force magnitude

			this.force.mult(this.strength); // Get force vector --> magnitude * direction
		} else {
			this.force.mult(0);
		}

		return this.force;

	}


	this.applyForce = function(force) {
		this.f = p5.Vector.div(force, this.mass);
		this.acceleration.add(this.f);
	}


	this.update = function(targetX_, targetY_) {
		this.tx = targetX_;
		this.ty = targetY_;

		this.dx = this.loc.x - this.tx;
		this.dy = this.loc.y - this.ty;
		this.angle = atan2(this.dx, this.dy);
		this.targetX = this.tx + sin(this.angle) * this.springLength;
		this.targetY = this.ty + cos(this.angle) * this.springLength;


		if (this.move) {
			this.loc.x = mouseX;
			this.loc.y = mouseY;
		}
		if (this.n > 0) {
			this.stiffness = 0.8;
			this.damping = 0.8;

			this.forceX = (this.targetX - this.loc.x) * this.stiffness;
			this.ax = this.forceX / this.mass;
			this.vx = this.damping * (this.vx + this.ax);

			this.loc.x += this.vx;
			this.forceY = (this.targetY - this.loc.y) * this.stiffness;
			//this.forceY += this.gravity;
			this.ay = this.forceY / this.mass;
			this.vy = this.damping * (this.vy + this.ay);
			this.loc.y += this.vy;


			if (this.overEvent() || this.move) {
				this.over = true;
			} else {
				this.over = false;
			}
			this.velocity.add(this.acceleration);
			this.loc.add(this.velocity);
			this.acceleration.mult(0);

		} else {
			this.loc = createVector(width / 2, (-this.n) * height / 6 - height / 6+100);
		}

	}



	this.show = function() {

		stroke(this.inside);
		this.sw = this.radius / 20;
		strokeWeight(this.sw);

		line(this.tx, this.ty, this.loc.x, this.loc.y);


		stroke(this.inside);
		fill(this.outside);
		ellipse(this.loc.x, this.loc.y, this.radius, this.radius);

		fill(255);
		noStroke();
		textAlign(CENTER, CENTER);
		textSize(this.radius / 7 + 2);
		text(this.string, this.loc.x, this.loc.y, this.raduis, this.radius * 2);
		this.twidth = textWidth(this.intro);

	}
this.textShow=function(){
	if (this.overEvent() && this.radius<32) {
			this.change;
			if (mouseX > width / 2) {
				this.change = 50;
			} else {
				this.change = -400;
			}
	

		
			fill(255, 100);
		 //rect(mouseX + 40 + this.change, mouseY, 350, 180, 4);
			fill(255);
			textSize(14);
			textAlign(LEFT, TOP);
		
			text(this.string, mouseX + this.change + 50, mouseY + 10,this.radius/2,this.radius);
  // document.write("你好！");
  
    
  
			textSize(10);
		
			this.xx=mouseX+ this.change + 50;
			this.yy=mouseY+40;
			text(this.intro, 
			this.xx,this.yy ,150,400);
	}
}


	this.overEvent = function() {
		if (sq(mouseX - this.loc.x) + sq(mouseY - this.loc.y) < sq(this.radius)) {
			return true;
		} else {
			return false;
		}
	}

	this.returnN = function() {
		return this.n;
	}




	this.pressed = function() {
		if (this.over) {

			if(textWidth(this.link)>2){
			window.open(this.link);
			}
			this.move = true;
		} else {
			this.move = false;
		}
	}

	this.released = function() {
		this.move = false;
	}
}