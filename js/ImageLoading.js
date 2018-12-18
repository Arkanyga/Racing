let picsToLoad = 0;
const carPic = document.createElement("img"),
  trackPicRoad = document.createElement("img"),
  trackPicWall = document.createElement("img");


function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if (picsToLoad === 0) {
    loadingDoneSoStartGame();
  }
}

function loadImages() {
  let imageList = [
    { picName: carPic, scr: 'player1.png' },
    { picName: trackPicRoad, scr: 'road.png' },
    { picName: trackPicWall, scr: 'wall.png' }
  ]
  picsToLoad = imageList.length;
  imageList.forEach(el => beginLoadingImage(el.picName, el.scr))
}

function beginLoadingImage(picName, src) {
  picName.onload = countLoadedImageAndLaunchIfReady;
  picName.src = 'images/' + src;
}
