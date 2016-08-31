console.log(20*5);

var FPS = 60;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var GRAVITY = 0.4;

var ctx;
var particleList = [];
var mx = null;
var my = null;

// Particles
var Particle = function(x, y){
  this.x = x;
  this.y = y;
};

//Prototypes and methods
Particle.prototype = {
  x: null,
  y: null,
  vx: 0,
  vy: 0,
  radius: 0,
  color: null,
  isRemove: false,
  // Define Particle Types
  create: function() {
    this.vx = Math.random() * 6 - 3;
    this.vy = Math.random() * (-6) - 2;
    this.radius = Math.random() * 20 + 5;
    var r = 150;
    var g = Math.floor(Math.random() * 100 + 155);
    var b = Math.floor(Math.random() * 155 + 100);
    this.color = "rgb(" + r + "," + g + ", " + b + ")";
  },
  //Updating particles shape
  update: function() {
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
    this.radius *= .97;
  //Remove particles outside of screen
    if (this.x < 0 || this.x > SCREEN_WIDTH || this.y > SCREEN_HEIGHT) {
    this.isRemove = true;
    }
  },
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fill();
  }
};

window.onload = function(){
  init();
};

//Initialization
var init = function(){
  var canvas = document.getElementById("mycanvas");
  if (!canvas || !canvas.getContext) {
    return false;
  }
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  ctx = canvas.getContext("2d");

  canvas.addEventListener("mousemove", updateMousePos, false);
  canvas.addEventListener("mouseout", resetMousePos, false);

  loop();
}

var updateMousePos = function(e){
  var rect = e.target.getBoundingClientRect();
  mx = e.clientX - rect.left;
  my = e.clientY - rect.top;
};

var resetMousePos = function(e){
  mx = null;
  my = null;
};

var loop = function(){
  add();
  update();
  draw();
  setTimeout(loop, 1000 / FPS);
}

var add = function(){
  if (mx !== null && my !== null) {
    var p = new Particle(mx, my);
    p.create();
    particleList.push(p);
  }
};

var update = function(){
  var list = [];
  for (var i = 0; i < particleList.length; i++) {
    particleList[i].update();
    if(!particleList[i].isRemove){
      list.push(particleList[i]);
    }
  }
  particleList = list;
};

var draw = function(){
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (var i = 0; i < particleList.length; i++) {
    particleList[i].draw();
  }
  ctx.restore();
};
