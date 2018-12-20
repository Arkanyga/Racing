
const TRACK_W = 40,
  TRACK_H = 40,
  TRACK_COLS = 20,
  TRACK_ROWS = 15,
  trackGrid =
    [4, 4, 4, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4, 4,
      4, 4, 1, 0, 0, 0, 0, 0, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 4, 4,
      4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 4,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 0, 1, 0, 0, 1,
      5, 3, 3, 5, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
      1, 2, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1,
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  TRACK_ROAD = 0,
  TRACK_WALL = 1,
  TRACK_PLAYER = 2,
  TRACK_FINISH = 3,
  TRACK_FOREST = 4,
  TRACK_POLL = 5;


function drawTracks() {
  let trackIndex = 0;
  let trackLeftEdgeX = 0;
  let trackTopEdgeY = 0;
  for (let row = 0; row < TRACK_ROWS; row++) {
    trackLeftEdgeX = 0;
    for (let col = 0; col < TRACK_COLS; col++) {
      let trackTypeHere = trackGrid[trackIndex];
      canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);
      trackIndex++;
      trackLeftEdgeX += TRACK_W;
    }
    trackTopEdgeY += TRACK_H;
  }
}



function trackAtPixelCoord(pixelX, pixelY) {
  let gridCoord = findOutRowAndCol(pixelX, pixelY)
  //индекс ячейки в которую ударили
  let trackIndex = gridCoord.col + TRACK_COLS * gridCoord.row;
  return trackGrid[trackIndex];
}

function findOutRowAndCol(pixelX, pixelY) {
  let tileRow = Math.floor(pixelY / TRACK_H);
  let tileCol = Math.floor(pixelX / TRACK_W);
  return {
    row: tileRow,
    col: tileCol
  }
}

function startButton() {
  document.addEventListener('click', function (e) {
    let mousePos = calculateMousePos(e);
    if (mousePos.x > startButtonX && mousePos.x < startButtonX + widthStartButton && mousePos.y > startButtonY &&
      mousePos.y < startButtonY + heightStartButton) {
      startButtonTapped = true;
      drawCount();
      let interval = setInterval(function () {
        startCount--;
        drawCount();
        if (startCount === 0) {
          clearInterval(interval);
        }
      }, 1000)

    }

  }, { once: true })
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