
const carPic = document.createElement("img"),
  canvas = document.getElementById('gameCanvas'),
  canvasContext = canvas.getContext('2d'),
  FRAME_PER_SECOND = 30,
  TRACK_W = 40,
  TRACK_H = 40,
  TRACK_GAP = 2,
  TRACK_COLS = 20,
  TRACK_ROWS = 15,
  CAR_WIDTH = 40,
  CAR_HEIGHT = 20,
  KEY_UP = 87,
  KEY_DOWN = 83,
  KEY_LEFT = 65,
  KEY_RIGTH = 68,
  GROUNDSPEED_DECAY_MULT = 0.9,
  DRIVE_POWER = 0.5,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.03,
  MIN_TURN_SPEED = 1.5,
  trackGrid =
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  TRACK_ROAD = 0,
  TRACK_WALL = 1,
  TRACK_PLAYER = 2;


let carX, carY,
  carSpeed = 0,
  startCarAng = Math.PI,
  carAng = -0.5 * Math.PI,
  carAngRotate = 0.2,
  keyHeldGas = false,
  keyHeldReverse = false,
  keyHeldTurnLeft = false,
  keyHeldTurnRight = false,
  carPicLoaded = false,
  carRadius = 10;


window.onload = function () {

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  //	load	car	image
  carPic.onload = function () {
    carPicLoaded = true; //	dont	try	to	display	until	it’s	loaded
  }
  carPic.src = "player1.png";

  carReset();

  setInterval(function () {
    moveEverething();
    drawEverething();

  }, 1000 / FRAME_PER_SECOND);
}

function keyPressed(e) {
  e.preventDefault();
  setKeyHoldState(e, true)
}

function keyReleased(e) {
  e.preventDefault();
  setKeyHoldState(e, false)
}

function setKeyHoldState(e, state) {
  switch (e.keyCode) {
    case KEY_UP:
      keyHeldGas = state;
      break
    case KEY_DOWN:
      keyHeldReverse = state;
      break
    case KEY_LEFT:
      keyHeldTurnLeft = state;
      break;
    case KEY_RIGTH:
      keyHeldTurnRight = state;
      break;
  }
}

function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  //circle
  carDraw();
  //tracks
  drawTracks();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function carDraw() {
  if (carPicLoaded) {
    drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, CAR_WIDTH, CAR_HEIGHT, carAng)
  }
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, graphicWidth, graphicHeight, withAngle) {
  canvasContext.save();	//	allows	us	to	undo	translate	movement	and	rotate	spin
  canvasContext.translate(atX, atY);	//	sets	the	point	where	our	graphic	will	go
  canvasContext.rotate(startCarAng + withAngle);	//	sets	the	rotation
  canvasContext.drawImage(graphic, -graphicWidth / 2, - graphicHeight / 2, graphicWidth, graphicHeight);	//	center,	draw
  canvasContext.restore();	//	undo	the	translation	movement	and	rotation	since	save()
}


function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}

function moveEverething() {
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


function drawTracks() {
  for (let col = 0; col < TRACK_COLS; col++) {
    for (let row = 0; row < TRACK_ROWS; row++) {
      if (isWallAtTileCoord(col, row)) {
        let trackLeftEdgeX = col * TRACK_W;
        let trackTopEdgeY = row * TRACK_H;
        colorRect(trackLeftEdgeX, trackTopEdgeY, TRACK_W - TRACK_GAP,
          TRACK_H - TRACK_GAP, 'blue');
      }
    }
  }
}



function isWallAtTileCoord(trackTileCol, trackTileRow) {
  let trackIndex = trackTileToIndex(trackTileCol, trackTileRow)
  return (trackGrid[trackIndex] === 1)
}


function checkForTrackAtPixelCoord(pixelX, pixelY) {
  let tileCol = Math.floor(pixelX / TRACK_W);
  let tileRow = Math.floor(pixelY / TRACK_H);
  //проверяем находится ли мяч в районе кирпичей
  if (tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS) {
    return false
  }

  //индекс ячейки в которую ударили
  let trackIndex = trackTileToIndex(tileCol, tileRow);
  return (trackGrid[trackIndex] === TRACK_ROAD)
}

function trackTileToIndex(tileCol, tileRow) {
  return (tileCol + TRACK_COLS * tileRow)
}