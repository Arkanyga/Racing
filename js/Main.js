
const canvas = document.getElementById('gameCanvas'),
  canvasContext = canvas.getContext('2d'),
  FRAME_PER_SECOND = 30;

window.onload = function () {
  loadImages();
  initInput();
  countLoadedImageAndLaunchIfReady();
  carReset();
}


function loadingDoneSoStartGame() {
  setInterval(function () {
    moveEverething();
    drawEverething();
  }, 1000 / FRAME_PER_SECOND);
}

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if (picsToLoad === 0) {
    loadingDoneSoStartGame();
  }
}

function drawEverething() {
  drawTracks();
  carDraw();

}

function moveEverething() {
  carMove();
}