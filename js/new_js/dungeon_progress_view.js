const PRIZE_LIST = ['unknown-prize', 'crystal', 'red-crystal', 'blue-pendant', 'green-pendant'];

class DungeonProgressView {
  constructor(dungeonsEl, game) {
    this.dungeonsEl = dungeonsEl;
    this.game = game;
    this.attachToDOM();
  }

  attachToDOM() {
    const caveEl = document.createElement('div');
    const caveNameEl = document.createElement('div');
    caveNameEl.textContent = 'CV';
    caveEl.appendChild(caveNameEl);
    caveEl.appendChild(document.createElement('div'));
    caveEl.appendChild(document.createElement('div'));
    caveEl.appendChild(document.createElement('div'));
    caveEl.appendChild(document.createElement('div'));
    this.dungeonsEl.appendChild(caveEl);

    for (const [name, dungeon] of this.game.dungeons.dungeons) {
      const el = document.createElement('div');
      el.dataset.name = name;

      for (const field of ['completed', 'prize', 'keys', 'bigKey', 'items']) {
        const fieldEl = document.createElement('div');
        fieldEl.dataset.field = field;
        el.appendChild(fieldEl);
      }
      el.childNodes[0].textContent = name;
      el.childNodes[2].className = 'keys';
      if (!dungeon.noBigKey) {
        el.childNodes[3].className = 'big-key';
      }
      this.dungeonsEl.appendChild(el);
    }
  }

  foundDungeon(name) {
    let poiName = name;
    if (name === 'DP') {
      poiName = 'desert-back';
    }
    if (name === 'TR') {
      poiName = 'tr-back';
    }

    if (name === 'HC') {
      return this.game.hyruleMap.pois.has('hyrule-west') ||
        this.game.hyruleMap.pois.has('hyrule-main') ||
        this.game.hyruleMap.pois.has('hyrule-east');
    }
    return this.game.hyruleMap.pois.has(poiName);
  }

  render() {
    this.dungeonsEl.childNodes[0].childNodes[4].textContent = this.game.hyruleMap.caveItems();
    this.dungeonsEl.childNodes[0].childNodes[0].classList.toggle('incomplete', this.game.hyruleMap.caveItems() > 0);

    for (const el of this.dungeonsEl.childNodes) {
      const name = el.dataset.name;
      const dungeon = this.game.dungeons.dungeons.get(name);
      if (!dungeon) continue;

      el.classList.toggle('placing2', el.dataset.name === this.game.dungeons.selected);
      el.childNodes[0].classList.toggle('incomplete', !dungeon.completed && this.foundDungeon(name));
      el.childNodes[0].classList.toggle('not-found', !dungeon.completed && !this.foundDungeon(name));
      if (!dungeon.noPrize) {
        el.childNodes[1].className = PRIZE_LIST[dungeon.prize];
        el.childNodes[1].classList.toggle('incomplete', !dungeon.completed);
      }
      if (dungeon.maxKeys) {
        el.childNodes[2].textContent = dungeon.keys;
        el.childNodes[2].classList.toggle('all-keys', dungeon.keys === dungeon.maxKeys);
      }
      if (!dungeon.noBigKey) {
        el.childNodes[3].classList.toggle('incomplete', !dungeon.bigKey);
      }
      el.childNodes[4].textContent = dungeon.items;
    }
  }
}
