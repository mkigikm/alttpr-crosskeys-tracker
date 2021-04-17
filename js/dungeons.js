function mod(n, m) {
  return ((n % m) + m) %m;
}
const PRIZE_LIST = ['unknown-prize', 'crystal', 'red-crystal', 'blue-pendant', 'green-pendant'];

class Dungeons {
  constructor() {
    const dungeonEl = document.getElementById('dungeons');
    this.dungeons = new Map();

    for (const dungeon of dungeonData) {
      const el = document.createElement("div");

      for (const field of ['completed', 'prize', 'keys', 'bigKey', 'items']) {
        const fieldEl = document.createElement("div");
        fieldEl.dataset.dungeon = dungeon.name;
        fieldEl.dataset.field = field;
        el.appendChild(fieldEl);
      }

      this.dungeons.set(dungeon.name, {
        completed: false,
        prize: 0,
        noPrize: dungeon.noPrize,
        keys: 0,
        maxKeys: dungeon.keys,
        items: dungeon.items,
        maxItems: dungeon.items,
        bigKey: false,
        noBigKey: dungeon.noBigKey,
        el: el,
      });

      dungeonEl.append(el);
      this.render(dungeon.name);
    }

    dungeonEl.addEventListener('click', e => this.track(e.target, 1));
    dungeonEl.addEventListener('contextmenu', e => {
      this.track(e.target, -1);
      e.preventDefault();
    });
  }

  render(name) {
    const dungeon = this.dungeons.get(name);

    dungeon.el.childNodes[0].textContent = name;
    if (dungeon.completed) {
      dungeon.el.childNodes[0].classList.remove('incomplete');
    } else {
      dungeon.el.childNodes[0].classList.add('incomplete');
    }

    if (!dungeon.noPrize) {
      dungeon.el.childNodes[1].className = PRIZE_LIST[dungeon.prize];
      if (dungeon.completed) {
        dungeon.el.childNodes[1].classList.remove('incomplete');
      } else {
        dungeon.el.childNodes[1].classList.add('incomplete');
      }
    }

    if (dungeon.maxKeys) {
      dungeon.el.childNodes[2].textContent = dungeon.keys;
      dungeon.el.childNodes[2].className = 'keys';
      if (dungeon.keys === dungeon.maxKeys) {
        dungeon.el.childNodes[2].classList.add('all-keys');
      } else {
        dungeon.el.childNodes[2].classList.remove('all-keys');
      }
    }

    if (!dungeon.noBigKey) {
      dungeon.el.childNodes[3].className = 'big-key';
      if (dungeon.bigKey) {
        dungeon.el.childNodes[3].classList.remove('incomplete');
      } else {
        dungeon.el.childNodes[3].classList.add('incomplete');
      }
    }

    dungeon.el.childNodes[4].textContent = dungeon.items;
    typeof hyruleMap !== 'undefined' && hyruleMap.render();
  }

  track(el, diff) {
    const name = el.dataset.dungeon;
    const field = el.dataset.field;
    const dungeon = this.dungeons.get(name);
    if (!dungeon) return;

    switch (field) {
      case 'completed':
        dungeon.completed = !dungeon.completed;
        break;
      case 'prize':
        dungeon.prize = mod(dungeon.prize + diff, 5);
        break;
      case 'keys':
        dungeon.keys = Math.min(Math.max(dungeon.keys + diff, 0), dungeon.maxKeys);
        break;
      case 'bigKey':
        dungeon.bigKey = !dungeon.bigKey;
        break;
      case 'items':
        dungeon.items = Math.min(Math.max(dungeon.items - diff, 0), dungeon.maxItems);
        break;
    }
    this.render(name);
  }

  completedCastleTower() {
    return this.dungeons.get('CT').completed;
  }

  completedPendants() {
    let finishedPendants = 0;
    for (const dungeon of this.dungeons.values()) {
      if (dungeon.prize > 2 && dungeon.completed) {
        finishedPendants += 1;
      }
    }

    return finishedPendants >= 3;
  }

  completedGannonsTower() {
    return this.dungeons.get('GT').completed;
  }

  completedCrystals() {
    let finishedCrystals = 0;
    for (const dungeon of this.dungeons.values()) {
      if (dungeon.prize > 0 && dungeon.prize < 3 && dungeon.completed) {
        finishedCrystals += 1;
      }
    }

    return finishedCrystals >= 7;
  }

  completedRedCrystals() {
    let finishedRedCrystals = 0;
    for (const dungeon of this.dungeons.values()) {
      if (dungeon.prize === 2 && dungeon.completed) {
        finishedRedCrystals += 1;
      }
    }

    return finishedRedCrystals >= 2;
  }
}

const dungeons = new Dungeons();
