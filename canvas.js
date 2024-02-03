// introductory lines to begin with canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// to control through mouse movements
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// colorstack to randomly select colors
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// variables used in the code
var friction = 0.59;

// utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }

// Event Listeners
addEventListener('click', (event) => {
  // mouse.x = event.clientX
  // mouse.y = event.clientY
  init()
})

// to maintain the effect during resize
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Ball {
  constructor(x, y, dy, dx, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.dy = dy
    this.dx = dx
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    // c.stroke();
    c.closePath()
  }

  update() {
    // condition to create bouncing effect
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy * friction;
    }
    else{
      this.dy += 1;
    }
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    
    // manages speed of the balls
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

var ballArray = []; 

// Implementation

function init() {
  ballArray = [];

  for (let i = 0; i < 400; i++) {
    var x = randomIntFromRange(radius, canvas.width);
    var y = randomIntFromRange(0, canvas.height);
    var radius = randomIntFromRange(5, 30);
    var dx = randomIntFromRange(1, 4);
    var dy = randomIntFromRange(1, 4);
    var color = randomColor(colors);

    ballArray.push(new Ball(x, y, dy, dx, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

// Update all balls in the array
    for(var i = 0; i < ballArray.length; i ++){
        ballArray[i].update();
    }
}

init()
animate()
