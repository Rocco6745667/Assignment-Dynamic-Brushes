// Drawing with Multiple Brushes and Dynamic Variations
// Rocco Ali 218008847
// 09/25/2024

/**
 * Mouse and Key Mapping (How to use):
 * 
 * MOUSE:
 * - Drag (left click) to draw with the selected brush.
 * 
 * KEYS:
 * - 1-3                 : Switch between brush types (circle, square, triangle)
 * - R                   : Randomize shape radius
 * - W                   : Randomize stroke weight
 * - F                   : Toggle fill on/off
 * - [                   : Decrease shape resolution (for certain brushes)
 * - ]                   : Increase shape resolution (for certain brushes)
 * - =                   : Increase the shape size
 * - -                   : Decrease the shape size
 * - < or ,              : Rotate shapes counterclockwise
 * - > or .              : Rotate shapes clockwise
 * - DEL, Backspace      : Erase the canvas
 * - S                   : Save the drawing as PNG
 */

let strokeColor;
let shapeRadius = 50;
let shapeResolution = 5;
let filled = false;
let currentBrush = 'circle';  // Brushes: 'circle', 'square', 'triangle'
let rotationAngle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  strokeColor = color(0, 50);
  strokeWeight(0.75);
  background(255);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    push();
    translate(mouseX, mouseY);
    rotate(rotationAngle);  // Apply rotation for dynamic variation

    if (filled) {
      fill(random(255)); // Randomized fill color when filled
    } else {
      noFill();
    }

    stroke(strokeColor);
    
    // Draw based on the current brush type
    if (currentBrush === 'circle') {
      ellipse(0, 0, shapeRadius * 2, shapeRadius * 2);  // Circle
    } else if (currentBrush === 'square') {
      rectMode(CENTER);
      rect(0, 0, shapeRadius * 2, shapeRadius * 2);  // Square
    } else if (currentBrush === 'triangle') {
      triangle(-shapeRadius, shapeRadius, 0, -shapeRadius, shapeRadius, shapeRadius);  // Triangle
    }
    
    pop();
  }
}

function keyReleased() {
  // Clear canvas
  if (keyCode == DELETE || keyCode == BACKSPACE) 
    background(255);
  
  // Save canvas
  if (key == 's' || key == 'S') {
    let fileName = 'image_' + year() + month() + day() + hour() + minute() + second();
    saveCanvas(fileName, 'png');
  }
  
  // Increase and decrease shape size
  if (key == '=') {
    shapeRadius += 5;
  }
  if (key == '-') {
    shapeRadius -= 5;
    if (shapeRadius < 5) shapeRadius = 5;
  }
  
  // Randomize the shape's radius with the 'r' key
  if (key == 'r' || key == 'R') {
    shapeRadius = random(10, 150); // Random radius between 10 and 150
  }
  
  // Randomize the stroke weight with the 'w' key
  if (key == 'w' || key == 'W') {
    strokeWeight(random(0.5, 5)); // Random stroke weight between 0.5 and 5
  }
  
  // Toggle fill on/off
  if (key == 'f' || key == 'F') filled = !filled;
  
  // Change stroke color
  if (key == '1') strokeColor = color(0, 10);           // Black
  if (key == '2') strokeColor = color(192, 100, 64, 10); // Red
  if (key == '3') strokeColor = color(52, 100, 71, 10);  // Bluew
  
  // Rotate shapes counterclockwise
  if (key == ',' || key == '<') {
    rotationAngle -= radians(15);  // Decrease the rotation angle
  }
  
  // Rotate shapes clockwise
  if (key == '.' || key == '>') {
    rotationAngle += radians(15);  // Increase the rotation angle
  }
  
  // Switch between brushes
  if (key == '1') currentBrush = 'circle';   // Switch to Circle brush
  if (key == '2') currentBrush = 'square';   // Switch to Square brush
  if (key == '3') currentBrush = 'triangle'; // Switch to Triangle brush
}
