function leftPad(t) {
  return t < 10 ? `0${t}` : `${t}`;
}

class TimerView {
  constructor(timerEl, timer) {
    this.timerEl = timerEl;
    this.timer = timer;
  }

  render() {
    const t = parseInt(this.timer.currentTime() / 1000);
    const hours = parseInt(t / 3600);
    const minutes = parseInt((t % 3600) / 60);
    const second = t % 60;
    this.timerEl.innerHTML = `${hours}:${leftPad(minutes)}:${leftPad(seconds)}`;
  }
}
