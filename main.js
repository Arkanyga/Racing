
const WINNING_SCORE = 2,
  TRACK_W = 40,
  TRACK_H = 40,
  TRACK_GAP = 2,
  TRACK_COLS = 20,
  TRACK_ROWS = 15,
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
      1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
canvas = document.getElementById('gameCanvas'),
  canvasContext = canvas.getContext('2d');

let carX = canvas.width / 2 + 50,
  carY = canvas.height / 2,
  speed = 2,
  carSpeedX = speed,
  carSpeedY = speed,
  carRadius = 10;


window.onload = function () {
  let framesPerSecond = 60;
  setInterval(function () {
    moveEverething();
    drawEverething();

  }, 1000 / framesPerSecond);

}

function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  //circle
  colorCircle(carX, carY, carRadius, 'white');

  //tracks
  drawTracks()
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
  if (carX < 0 || carX > canvas.width) {
    carSpeedX *= -1;
  }
  // if (carY < 0 || carY > canvas.height) {
  //   carSpeedY *= -1;
  // }
  if (carY > canvas.height) {
    carReset();
  } else if (carY < 0) {
    carSpeedY *= -1;
  }
  carX += carSpeedX;
  carY += carSpeedY;
  bounceOffTrackAtPixelCoord(carX, carY);
}

function carReset() {
  carX = canvas.width / 2;
  carY = canvas.height / 2;
  carSpeedX = 0;
  carSpeedY = 0;
  setTimeout(function () {
    carSpeedX = speed;
    carSpeedY = speed;
  }, 800)
}


function drawTracks() {
  for (let col = 0; col < TRACK_COLS; col++) {
    for (let row = 0; row < TRACK_ROWS; row++) {
      if (isTrackAtTileCoord(col, row)) {
        let trackLeftEdgeX = col * TRACK_W;
        let trackTopEdgeY = row * TRACK_H;
        colorRect(trackLeftEdgeX, trackTopEdgeY, TRACK_W - TRACK_GAP,
          TRACK_H - TRACK_GAP, 'blue');
      }
    }
  }
}



function isTrackAtTileCoord(trackTileCol, trackTileRow) {
  let trackIndex = trackTileToIndex(trackTileCol, trackTileRow)
  return (trackGrid[trackIndex] === 1)
}


function bounceOffTrackAtPixelCoord(pixelX, pixelY) {
  let tileCol = Math.floor(pixelX / TRACK_W);
  let tileRow = Math.floor(pixelY / TRACK_H);
  //проверяем находится ли мяч в районе кирпичей
  if (tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS) {
    return
  }

  //индекс ячейки в которую ударили
  let trackIndex = trackTileToIndex(tileCol, tileRow);
  if (trackGrid[trackIndex] === 1) {
    let prevCarX = carX - carSpeedX;
    let prevCarY = carY - carSpeedY;
    let prevTileCol = Math.floor(prevCarX / TRACK_W);
    let prevTileRow = Math.floor(prevCarY / TRACK_H);
    let bothTestsFailed = true;
    //если попадаем и меняется колонка то отскакивает горизонтально
    if (prevTileCol != tileCol) {
      let adjacentTrackIndex = trackTileToIndex(prevTileCol, tileRow);//свободна или нет ячейка в prevTileCol для теста 
      if (trackGrid[adjacentTrackIndex] !== 1) {
        carSpeedX *= -1;
        bothTestsFailed = false;
      }
    }
    //если попадаем и меняется ряд то отскакивает вертикально
    if (prevTileRow != tileRow) {
      let adjacentTrackIndex = trackTileToIndex(tileCol, prevTileRow);//свободна или нет ячейка в prevTileCol для теста 
      if (trackGrid[adjacentTrackIndex] !== 1) {
        carSpeedY *= -1;
        bothTestsFailed = false;
      }
    }

    //если попадаем наискосок в место где с двух сторон стоят клетки 
    if (bothTestsFailed) {
      carSpeedY *= -1;
      carSpeedX *= -1;
    }
    //удаляем кирпич
  }
}

function trackTileToIndex(tileCol, tileRow) {
  return (tileCol + TRACK_COLS * tileRow)
}