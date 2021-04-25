function mod(n, m) {
  return ((n % m) + m) %m;
}
class DungeonProgressModel {
  constructor(dungeonData) {
    this.dungeons = new Map();

    for (const dungeon of dungeonData) {
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
      });
    }
  }

  track(name, field, diff) {
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
  }

  select(name) {
    if (name != 'CV') {
      this.selected = name;
    }
  }

  unselect() {
    delete this.selected;
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

  completedGanonsTower() {
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
