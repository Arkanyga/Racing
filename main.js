
const canvas = document.getElementById('gameCanvas'),
  canvasContext = canvas.getContext('2d'),
  FRAME_PER_SECOND = 30;

window.onload = function () {
  initInput();
  carInit();
  carReset();
  setInterval(function () {
    moveEverething();
    drawEverething();
  }, 1000 / FRAME_PER_SECOND);
}


function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  carDraw();
  drawTracks();
}

function moveEverething() {
  carMove();
}
