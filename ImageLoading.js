let picsToLoad = 3;
const carPic = document.createElement("img"),
  trackPicRoad = document.createElement("img"),
  trackPicWall = document.createElement("img");


function countLoadedImageAndLaunchIfReady() {
  console.log(1);
  picsToLoad--;
  if (picsToLoad === 0) {
    loadingDoneSoStartGame();
  }
}

function loadImages() {
  carPic.onload = countLoadedImageAndLaunchIfReady();
  carPic.src = 'player1.png';
  trackPicRoad.onload = countLoadedImageAndLaunchIfReady();
  trackPicRoad.src = 'road.png';
  trackPicWall.onload = countLoadedImageAndLaunchIfReady();
  trackPicWall.src = 'wall.png';
  console.log(picsToLoad);
}

