const controlSections = [
  'dropdowns',
  'info',
  'lw-dungeons',
  'dw-dungeons',
  'lw-connectors',
  'dw-connectors',
].map(id => document.getElementById(id));

class ControlPanel {
  constructor() {
    document.getElementById('controls').firstElementChild
            .addEventListener('click', e => this.switchControls(e.target));

    for (const el of controlSections) {
      if (el.id === 'dropdowns') {
        el.addEventListener('click', e => this.controlSelection(e.target, 'drop'));
      } else {
        el.addEventListener('click', e => this.controlSelection(e.target));
      }
      el.addEventListener('contextmenu', e => {
        this.clearPoi(e.target);
        e.preventDefault();
      });
      for (const poiEl of el.getElementsByTagName('div')) {
        poiEl.addEventListener('mouseenter', e => this.displayText(e.target));
      }
    }
  }

  controlSelection(el, type) {
    this.clearSelection();
    this.poi = el.classList[0];
    this.type = type || 'entrance';
    this.render();
  }

  clearSelection() {
    this.poi = null;
    this.type = null;
    this.item = null;
    this.render();
  }

  clearPoi(el) {
    hyruleMap.clearPoi(el.classList[0]);
  }

  switchControls(el) {
    this.clearSelection();
    for (const sectionEl of controlSections) {
      sectionEl.style.display = el.id === `${sectionEl.id}-toggle` ? 'flex' : 'none';
    }
  }

  placing(item) {
    if (item === this.item) {
      this.clearSelection();
      return;
    }
    this.clearSelection();
    this.item = item;
    this.type = 'item';
  }

  render() {
    for (const sectionEl of controlSections) {
      for (const el of sectionEl.getElementsByTagName('div')) {
        if (el.classList[0] === this.poi) {
          el.classList.add('tracking');
          el.classList.remove('tracked');
        } else {
          el.classList.remove('tracking');
          el.classList.toggle('tracked', hyruleMap.pois.has(el.classList[0]));
        }
      }
    }
  }

  displayText(el) {
    const poi = hyruleMap.pois.get(el.classList[0]);
    if (poi) {
      display.setText(`${el.classList[0]} at ${poi.name}`);
    }
  }
}

const controlPanel = new ControlPanel();
