
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

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, graphicWidth, graphicHeight, withAngle) {
  canvasContext.save();	//	allows	us	to	undo	translate	movement	and	rotate	spin
  canvasContext.translate(atX, atY);	//	sets	the	point	where	our	graphic	will	go
  canvasContext.rotate(startCarAng + withAngle);	//	sets	the	rotation
  canvasContext.drawImage(graphic, -graphicWidth / 2, - graphicHeight / 2, graphicWidth, graphicHeight);	//	center,	draw
  canvasContext.restore();	//	undo	the	translation	movement	and	rotation	since	save()
}

