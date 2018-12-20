
const GROUNDSPEED_DECAY_MULT = 0.95,
  DRIVE_POWER = 0.5,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.03,
  MAX_ROUNDS = 3,//кол-во кругов
  MIN_TURN_SPEED = 1.5;



class Car {
  constructor(gasKey, reverseKey, leftKey, rightKey, carPic) {
    this.carX;
    this.carY;
    this.homeX;
    this.homeY;
    this.carSpeed = 0;
    this.carAng = -0.5 * Math.PI;
    this.keyHeldGas = false;
    this.keyHeldReverse = false;
    this.keyHeldTurnLeft = false;
    this.keyHeldTurnRight = false;
    this.controlKeyForGas = gasKey;
    this.controlKeyForReverse = reverseKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
    this.carPic = carPic;
    this.timer = 0;
    this.timeCounter = 0;
    this.roundCounter = 0;
    this.bestTimeArr = []
    this.bestTime = 0;
    this.timerInterval;
    this.achieveFinish = false;
  }

  carDraw() {
    drawBitmapCenteredAtLocationWithRotation(this.carPic, this.carX, this.carY, this.carAng)
  }



  carMove() {
    let nextCarX = this.carX + Math.cos(this.carAng) * this.carSpeed;
    let nextCarY = this.carY + Math.sin(this.carAng) * this.carSpeed;
    let currentRows = findOutRowAndCol(this.carX, this.carY);
    let nextRows = findOutRowAndCol(nextCarX, nextCarY);
    let rowDifference = currentRows.row - nextRows.row;

    //start time
    if (trackAtPixelCoord(nextCarX, nextCarY) === TRACK_FINISH && rowDifference > 0) {
      clearInterval(this.timerInterval)
      let timeOneRound = this.timer - this.timeCounter;
      if (timeOneRound !== 0) {
        this.bestTimeArr.push(this.timer - this.timeCounter);
        this.bestTime = Math.min(...this.bestTimeArr);
      }
      this.timeCounter = this.timer;
      this.roundCounter++;

      if (this.roundCounter <= MAX_ROUNDS) {
        this.timerInterval = setInterval(() => {
          this.timer++;
        }, 1000 / 60);
      } else {
        this.achieveFinish = true;
      }
    }
    console.log(this.bestTime)
    //разрешить проезд
    if ((trackAtPixelCoord(nextCarX, nextCarY) === TRACK_FINISH && rowDifference !== -1 ||
      trackAtPixelCoord(nextCarX, nextCarY) === TRACK_ROAD)) {
      if (this.keyHeldGas) {
        this.carSpeed += DRIVE_POWER;
      }
      if (this.keyHeldReverse) {
        this.carSpeed -= REVERSE_POWER;
      }
      if (this.keyHeldTurnLeft && Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
        this.carAng -= TURN_RATE * Math.PI;
      }
      if (this.keyHeldTurnRight && Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
        this.carAng += TURN_RATE * Math.PI;
      }
      this.carX = nextCarX;
      this.carY = nextCarY;
    } else {
      this.carSpeed = 0;
    }
    this.carSpeed *= GROUNDSPEED_DECAY_MULT;
  }

  carReset() {
    if (this.homeX == undefined) {
      for (let i = 0; i < trackGrid.length; i++) {
        if (trackGrid[i] === TRACK_PLAYER) {
          let tileRow = Math.floor(i / TRACK_COLS);
          let tileCol = i % TRACK_COLS;
          this.homeX = tileCol * TRACK_W + TRACK_W / 2;
          this.homeY = tileRow * TRACK_H + TRACK_H / 2;
          trackGrid[i] = TRACK_ROAD;
          break
        }
      }
    }
    this.carX = this.homeX;
    this.carY = this.homeY;
    this.carAng = -0.5 * Math.PI;
    this.timer = 0;
    this.timeCounter = 0;
    this.roundCounter = 0;
    this.bestTimeArr = []
    this.bestTime = 0;
    this.achieveFinish = false;
  }

  initInput() {
    document.addEventListener('keydown', this.keyPressed.bind(this));
    document.addEventListener('keyup', this.keyReleased.bind(this));
  }


  setKeyHoldState(e, state) {
    switch (e.keyCode) {
      case this.controlKeyForGas:
        this.keyHeldGas = state;
        break
      case this.controlKeyForReverse:
        this.keyHeldReverse = state;
        break
      case this.controlKeyForTurnLeft:
        this.keyHeldTurnLeft = state;
        break;
      case this.controlKeyForTurnRight:
        this.keyHeldTurnRight = state;
        break;
    }
  }

  keyPressed(e) {
    e.preventDefault();
    this.setKeyHoldState(e, true)
  }

  keyReleased(e) {
    e.preventDefault();
    this.setKeyHoldState(e, false)
  }
}


