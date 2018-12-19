

const GROUNDSPEED_DECAY_MULT = 0.93,
  DRIVE_POWER = 0.5,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.03,
  MIN_TURN_SPEED = 1.5;


let carX, carY,
  carSpeed = 0,
  carAng = -0.5 * Math.PI,
  carAngRotate = 0.2;


function carDraw() {
  drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng)
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
