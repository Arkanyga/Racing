
const canvas = document.getElementById('gameCanvas'),
  canvasContext = canvas.getContext('2d'),
  FRAME_PER_SECOND = 30;


let p1 = new Car(87, 83, 65, 68, carPic);
let p2 = new Car(38, 40, 37, 39, car2Pic);




window.onload = function () {
  loadImages();
  p1.initInput();
  p2.initInput();
  countLoadedImageAndLaunchIfReady();
  p1.carReset();
  p2.carReset();
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
  p1.carDraw();
  p2.carDraw();
}

function moveEverething() {
  p1.carMove();
  p2.carMove();
  console.log(p2.carX, p2.carY);

}
