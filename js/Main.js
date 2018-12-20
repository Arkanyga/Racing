
const canvas = document.getElementById('gameCanvas'),
  canvasContext = canvas.getContext('2d'),
  FRAME_PER_SECOND = 30;


let p1 = new Car(87, 83, 65, 68, carPic);
let p2 = new Car(38, 40, 37, 39, car2Pic);
let startButtonTapped = false;
let beginFlag = false;
let count = 3;
let startCount = count;




window.onload = function () {
  loadImages();
  startButton();
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
    isBothFinish(p1, p2);
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
  drawTimeAndWinner(p1, p2);
  if (!startButtonTapped) {
    drawStart();
  }
}

function moveEverething() {
  if (startButtonTapped && startCount === 0) {
    p1.carMove();
    p2.carMove();
  }
}


function isBothFinish(car1, car2) {
  if (car1.achieveFinish && car2.achieveFinish && !beginFlag) {
    beginFlag = true;
    setTimeout(() => {
      startCount = 3;
      car1.carReset();
      car2.carReset();
      startButton();
      startButtonTapped = false;
      beginFlag = false;
    }, 2500)
  }
}