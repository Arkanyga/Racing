
const carPic = document.createElement("img"),
  CAR_WIDTH = 40,
  CAR_HEIGHT = 20,
  GROUNDSPEED_DECAY_MULT = 0.9,
  DRIVE_POWER = 0.5,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.03,
  MIN_TURN_SPEED = 1.5;


let carX, carY,
  carSpeed = 0,
  startCarAng = Math.PI,
  carAng = -0.5 * Math.PI,
  carAngRotate = 0.2,
  carPicLoaded = false;

function carInit() {
  //	load	car	image
  carPic.onload = function () {
    carPicLoaded = true; //	dont	try	to	display	until	it’s	loaded
  }
  carPic.src = "player1.png";
  carReset();
}


function carDraw() {
  if (carPicLoaded) {
    drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, CAR_WIDTH, CAR_HEIGHT, carAng)
  }
}


function carMove() {
  let nextCarX = carX + Math.cos(carAng) * carSpeed;
  let nextCarY = carY + Math.sin(carAng) * carSpeed;
  if (checkForTrackAtPixelCoord(nextCarX, nextCarY)) {
    if (keyHeldGas) {
      carSpeed += DRIVE_POWER;
    }
    if (keyHeldReverse) {
      carSpeed -= REVERSE_POWER;
    }
    if (keyHeldTurnLeft && Math.abs(carSpeed) > MIN_TURN_SPEED) {
      carAng -= TURN_RATE * Math.PI;
    }
    if (keyHeldTurnRight && Math.abs(carSpeed) > MIN_TURN_SPEED) {
      carAng += TURN_RATE * Math.PI;
    }
    carX = nextCarX;
    carY = nextCarY;
  } else {
    carSpeed = 0;
  }
  carSpeed *= GROUNDSPEED_DECAY_MULT;
}

function carReset() {
  for (let i = 0; i < trackGrid.length; i++) {
    if (trackGrid[i] === TRACK_PLAYER) {
      tileRow = Math.floor(i / TRACK_COLS);
      tileCol = i % TRACK_COLS;
      trackGrid[i] = TRACK_ROAD;
    }
  }
  carX = tileCol * TRACK_W + TRACK_W / 2;
  carY = tileRow * TRACK_H + TRACK_H / 2;
}
