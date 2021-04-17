class Display {
  constructor() {
    this.el = document.getElementById('display');
  }

  setText(text) {
    this.el.textContent = text;
  }

  clearText() {
    this.el.textContent = '';
  }
}

const display = new Display();
