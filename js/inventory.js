class Inventory {
  constructor() {
    const abuttonEl = document.getElementById('abutton');
    const ybuttonEl = document.getElementById('ybutton');
    this.objects = new Map();

    for (const item of totalInventory) {
      const el = document.createElement("div");
      el.dataset.name = item.name;
      this.objects.set(item.name, {
        level: 0,
        maxLevel: item.maxLevel,
        el: el,
      });
      item.abutton ? abuttonEl.appendChild(el) : ybuttonEl.appendChild(el);
    }
    this.render();

    ybuttonEl.addEventListener('click', e => this.track(e.target));
    abuttonEl.addEventListener('click', e => this.track(e.target));

    ybuttonEl.addEventListener('contextmenu', e => {
      this.place(e.target);
      e.preventDefault();
    });
    abuttonEl.addEventListener('contextmenu', e => {
      this.place(e.target);
      e.preventDefault();
    });
  }

  render() {
    for (const [name, object] of this.objects) {
      object.el.className = name;
      object.el.classList.add('level' + object.level);
      object.el.classList.toggle('placing', name === controlPanel.item);
    }
    hyruleMap.render();
  }

  track(el) {
    const name = el.dataset.name;
    const object = this.objects.get(name);
    if (!object) return;

    object.level = (object.level + 1) % (object.maxLevel + 1);
    this.render();
  }

  place(el) {
    const name = el.dataset.name;
    const object = this.objects.get(name);
    if (!object) return;

    controlPanel.placing(name);
    this.render();
  }

  hasMedallion(medallion) {
    switch (medallion) {
    case 1:
      return this.objects.get('bombos').level > 0;
    case 2:
      return this.objects.get('ether').level > 0;
    case 3:
      return this.objects.get('quake').level > 0;
    default:
      return this.objects.get('bombos').level > 0 &&
        this.objects.get('ether').level > 0 &&
        this.objects.get('quake').level > 0;
    }
  }
}

inventory = new Inventory();
