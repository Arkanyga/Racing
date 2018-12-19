
const TRACK_W = 40,
  TRACK_H = 40,
  TRACK_COLS = 20,
  TRACK_ROWS = 15,
  trackGrid =
    [4, 4, 4, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4,
      4, 4, 1, 0, 0, 0, 0, 0, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 4, 4,
      4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 4,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 2, 2, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 0, 1, 0, 0, 1,
      5, 3, 3, 5, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
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

function isWallAtTileCoord(trackTileCol, trackTileRow) {
  let trackIndex = trackTileToIndex(trackTileCol, trackTileRow)
  return (trackGrid[trackIndex] === TRACK_WALL)
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