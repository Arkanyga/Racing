let picsToLoad = 0;
const carPic = document.createElement("img");
const car2Pic = document.createElement("img");
let trackPics = [];


function loadImages() {
  let imageList = [
    { picName: carPic, src: 'player1.png' },
    { picName: car2Pic, src: 'player2.png' },

    { trackType: TRACK_ROAD, src: 'road.png' },
    { trackType: TRACK_WALL, src: 'wall.png' },
    { trackType: TRACK_POLL, src: 'poll.png' },
    { trackType: TRACK_FOREST, src: 'forest.png' },
    { trackType: TRACK_FINISH, src: 'finish.png' }
  ]
  picsToLoad = imageList.length;

  for (let i = 0; i < picsToLoad; i++) {
    if (imageList[i].trackType != undefined) {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].src);
    } else {
      beginLoadingImage(imageList[i].picName, imageList[i].src)
    }
  }
}

function beginLoadingImage(picName, src) {
  picName.onload = countLoadedImageAndLaunchIfReady;
  picName.src = 'images/' + src;
}

function loadImageForTrackCode(trackCode, src) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], src);
}