class TimerModel {
  constructor() {
    this.total = 0;
    this.started = false;
  }

  click() {
    console.log('click');
    if (this.started) {
      this.total += Date.now() - this.startTime;
    } else {
      this.startTime = Date.now();
    }
    this.started = !this.started;
  }

  currentTime() {
    if (!this.started) {
      return this.total;
    }
    return Date.now() - this.startTime + this.total;
  }
}
