
const TRACK_W = 40,
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
      1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  TRACK_ROAD = 0,
  TRACK_WALL = 1,
  TRACK_PLAYER = 2;


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