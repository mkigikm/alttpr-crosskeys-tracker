const ABUTTON_ITEMS = ['boots', 'glove', 'flippers', 'mearl'];

class InventoryView {
  constructor(abuttonEl, ybuttonEl, game) {
    this.abuttonEl = abuttonEl;
    this.ybuttonEl = ybuttonEl;
    this.game = game;
    this.attachToDOM();
  }

  attachToDOM() {
    for (const name of this.game.inventory.objects.keys()) {
      const el = document.createElement('div');
      el.className = name;
      if (ABUTTON_ITEMS.includes(name)) {
        this.abuttonEl.appendChild(el);
      } else {
        this.ybuttonEl.appendChild(el);
      }
    }
    const el = document.createElement('div');
    el.id = 'autotracker-modal-control';
    el.addEventListener('click', (e) => {
      document.getElementById('modal').style.display = 'block';
    });
    const textEl = document.createElement('p');
    textEl.id = 'autotracker-status';
    textEl.textContent = "AUTOTRACKING DISCONNECTED";
    el.appendChild(textEl);

    this.abuttonEl.appendChild(el);
  }

  render() {
    for (const buttonEl of [this.abuttonEl, this.ybuttonEl]) {
      for (const itemEl of buttonEl.children) {
        const object = this.game.inventory.objects.get(itemEl.classList[0]);
        if (!object) continue;

        itemEl.className = itemEl.classList[0];
        itemEl.classList.add(`level${object.level}`);
        itemEl.classList.toggle('placing2', !!object.selected);
        itemEl.classList.toggle('dp-item', this.game.dungeons.onDPTorch(object));
        itemEl.classList.toggle('gt-item', this.game.dungeons.onGTTorch(object));
      }
    }
  }
}
