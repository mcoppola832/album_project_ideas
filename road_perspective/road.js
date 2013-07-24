function Road (lineWidth, color) {
	if (lineWidth === undefined) { lineWidth = 2;}
	if (color === undefined) { color = "#000000";}
	this.segments = 4;
	this.segmentLength = 80;
	this.x = 0;
	this.y = 0;
	this.color = color;
	this.lineWidth = lineWidth;
	this.areaLines = [];
	this.lineCount = 20;
	this.delay = 100;

}
Road.prototype.play = function (context, frame, width, height) {

	for(var i = 0; i < this.lineCount; i++) {
		this.areaLines[i] = new AreaLine(this.x - (i*this.delay), this.y - (i*this.delay));
		this.areaLines[i].draw(context, frame - (i*this.delay), width, height, i);
	}
	
}

function AreaLine (x, y) {
	this.x = x;
	this.y = y;
	this.z = 1;
	this.color = "#000000";
	this.lineWidth = 2;
}
AreaLine.prototype.draw = function (context, frame, width, height, i) {
	context.save();
	//context.translate(this.x, this.y);	
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();
	
	seg = 80 - frame/3.6
	if (seg < 0) {
		seg = 0;
	}

	//boxes
	if (i % 2 == 0) {
		if (width/2 > this.x) {
/*			context.shadowBlur = 15;
			context.shadowColor = this.color;*/
			context.moveTo(this.x + seg, this.y + seg);
			context.lineTo(width - this.x - seg, this.y + seg);
			context.moveTo(width - this.x - seg, this.y + seg);
			context.lineTo(width - this.x - seg, height - this.y - seg);
			context.moveTo(width - this.x - seg, height - this.y - seg);
			context.lineTo(this.x + seg, height - this.y - seg);
			context.moveTo(this.x + seg, height - this.y - seg);
			context.lineTo(this.x + seg, this.y + seg);
		}
	}


	//top left
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + seg, this.y + seg);
	
	//top right
	context.moveTo(width - this.x, this.y);
	context.lineTo(width - this.x - seg, this.y + seg);

	//bottom left
	context.moveTo(this.x, height - this.y);
	context.lineTo(this.x + seg, height  - this.y - seg);

	//bottom right
	context.moveTo(width - this.x, height - this.y);
	context.lineTo(width - this.x - seg, height - this.y - seg);

	//snowflake
	if (i % 300 == 0) {
		context.moveTo
	}

	context.stroke();
	context.restore();
}

function SnowFlake (x, y, width, height) {
	//colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF",
	//	"#FF00FF", "#C0C0C0"];
	this.x = x;
	this.y = y;
	this.z = 1;
	this.delay = 100;
	//this.color = colors[Math.floor(Math.random()*colors.length)];
	this.lineWidth = 3;


	this.dx = Math.abs(x - width/2);
	this.dxu = x - width/2;
	this.dy = Math.abs(y - height/2);
	this.dyu = y - height/2;
	this.rate = (Math.sqrt(Math.pow(this.dx, 2)+Math.pow(this.dy, 2))/Math.sqrt(Math.pow(width/2, 2)+Math.pow(height/2, 2)))*3;
	if (this.dx > this.dy){
		this.xScale = this.dx/this.dy;
		this.yScale = 1;
	}
	else {
		this.xScale = 1;
		this.yScale = this.dy/this.dx;
	}

	this.trails = [];
	for (var i = 1; i < Math.random()*10; i++) {
		if(this.dxu < 0 && this.dyu < 0){
			this.trails.push(new SnowFlakeTrails(this.x - (i*this.delay*(this.dx/(width/2))), this.y - (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
		else if(this.dxu > 0 && this.dyu < 0){
			this.trails.push(new SnowFlakeTrails(this.x + (i*this.delay*(this.dx/(width/2))), this.y - (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
		else if(this.dxu < 0 && this.dyu > 0){
			this.trails.push(new SnowFlakeTrails(this.x - (i*this.delay*(this.dx/(width/2))), this.y + (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
		else if(this.dxu > 0 && this.dyu > 0){
			this.trails.push(new SnowFlakeTrails(this.x + (i*this.delay*(this.dx/(width/2))), this.y + (i*(this.delay*(this.dy/(height/2)))), width, this.rate));
		}
	}

}
SnowFlake.prototype.draw = function (context, frame, width, height) {
	
	context.save();
/*	context.translate(this.x, this.y);
	context.rotate(Math.PI*z);*/
	context.lineWidth = this.lineWidth;
	context.beginPath();
	

	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 8*this.z, this.y + 8*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 8*this.z, this.y + 8*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 8*this.z, this.y - 8*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 8*this.z, this.y - 8*this.z);



	//context.strokeStyle = this.color;

	context.stroke();

	context.restore();

	for(var i = 0; i <this.trails.length; i++) {
		this.trails[i].draw(context, frame, width, height);
	}


	rate = Math.max(this.z, 0.3)*this.rate;

	if(this.x > width/2) {
		this.x -= 1/this.yScale*rate;
	}
	else if (this.x < width/2) {
		this.x += 1/this.yScale*rate;
	}
	if(this.y > height/2) {
		this.y -= 1/this.xScale*rate;
	}
	else if (this.y < height/2) {
		this.y += 1/this.xScale*rate;
	}

}

function SnowFlakeTrails (x, y, width, height, rate) {
	colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF",
		"#FF00FF", "#C0C0C0"];
	this.x = x - 50;
	this.y = y - 50;
	this.z = 1;
	this.color = colors[Math.floor(Math.random()*colors.length)];
	this.lineWidth = 2;


	this.dx = Math.abs(x - width/2);
	this.dy = Math.abs(y - height/2);
	this.rate = rate;
	if (this.dx > this.dy){
		this.xScale = this.dx/this.dy;
		this.yScale = 1;
	}
	else {
		this.xScale = 1;
		this.yScale = this.dy/this.dx;
	}

}

SnowFlakeTrails.prototype.draw = function (context, frame, width, height) {
	
	context.save();
/*	context.translate(this.x, this.y);
	context.rotate(Math.PI*z);*/
	context.lineWidth = this.lineWidth;
	context.beginPath();
	

	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 4*this.z, this.y + 4*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 4*this.z, this.y + 4*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + 4*this.z, this.y - 4*this.z);
	context.moveTo(this.x, this.y);
	context.lineTo(this.x - 4*this.z, this.y - 4*this.z);



	context.strokeStyle = this.color;

	context.stroke();

	context.restore();

	rate = Math.max(this.z, 0.3)*this.rate;

	if(this.x > width/2) {
		this.x -= 1/this.yScale*rate;
	}
	else if (this.x < width/2) {
		this.x += 1/this.yScale*rate;
	}
	if(this.y > height/2) {
		this.y -= 1/this.xScale*rate;
	}
	else if (this.y < height/2) {
		this.y += 1/this.xScale*rate;
	}

}