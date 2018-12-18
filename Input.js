const KEY_UP = 87,
  KEY_DOWN = 83,
  KEY_LEFT = 65,
  KEY_RIGTH = 68;

let keyHeldGas = false,
  keyHeldReverse = false,
  keyHeldTurnLeft = false,
  keyHeldTurnRight = false;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function keyPressed(e) {
  e.preventDefault();
  setKeyHoldState(e, true)
}

function keyReleased(e) {
  e.preventDefault();
  setKeyHoldState(e, false)
}

function setKeyHoldState(e, state) {
  switch (e.keyCode) {
    case KEY_UP:
      keyHeldGas = state;
      break
    case KEY_DOWN:
      keyHeldReverse = state;
      break
    case KEY_LEFT:
      keyHeldTurnLeft = state;
      break;
    case KEY_RIGTH:
      keyHeldTurnRight = state;
      break;
  }
}

