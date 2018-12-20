let startButtonX = 250,
  startButtonY = 200,
  widthStartButton = 300,
  heightStartButton = 100;



function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAngle);
  canvasContext.drawImage(graphic, -graphic.width / 2, - graphic.height / 2);
  canvasContext.restore();
}


function drawTimeAndWinner(car1, car2) {
  canvasContext.font = "20px Arial";
  canvasContext.fillStyle = "#ffffff";

  if (car1.roundCounter <= MAX_ROUNDS) {
    canvasContext.fillText("1-ый ирок: " + (car1.timer / 60).toFixed(2) + '  круг ' + car1.roundCounter + '/' + MAX_ROUNDS, 125, 15);
  }
  if (car2.roundCounter <= MAX_ROUNDS) {
    canvasContext.fillText("2-ой игрок: " + (car2.timer / 60).toFixed(2) + '  круг ' + car2.roundCounter + '/' + MAX_ROUNDS, canvas.width - 315, 15);
  }

  if (car1.bestTime > 0) {
    canvasContext.fillText("1-ый ирок: " + (car1.timer / 60).toFixed(2), 125, 15);
    canvasContext.fillText("Лучший круг " + (car1.bestTime / 60).toFixed(2), 125, 35);
  }
  if (car2.bestTime > 0) {
    canvasContext.fillText("2-ой игрок: " + (car2.timer / 60).toFixed(2), canvas.width - 315, 15);
    canvasContext.fillText("Лучший круг " + (car2.bestTime / 60).toFixed(2), canvas.width - 315, 35);
  }

  canvasContext.fillStyle = "red";
  canvasContext.font = "20px Arial";
  if (car1.timer < car2.timer && car1.roundCounter > MAX_ROUNDS) {
    canvasContext.fillText("WINNER", 150, 55);
  } else if (car2.timer < car1.timer && car2.roundCounter > MAX_ROUNDS) {
    canvasContext.fillText("WINNER", canvas.width - 250, 55);
  }
}

function drawStart() {
  let x = colorRect(startButtonX, startButtonY, widthStartButton, heightStartButton, 'rgba(100,150,185,0.8)');
  canvasContext.font = "24px Arial";
  canvasContext.fillStyle = "#000";
  canvasContext.fillText("Нажмите чтобы начать", startButtonX + 20, startButtonY + 60);
}

function drawCount() {
  let countHTML = document.getElementById('count');
  countHTML.style.display = 'block';
  countHTML.innerHTML = startCount;
  if (startCount === 0) {
    countHTML.style.display = 'none';
  }
}

