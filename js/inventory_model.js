class InventoryModel {
  constructor(totalInventory) {
    this.objects = new Map();

    for (const item of totalInventory) {
      this.objects.set(item.name, { name: item.name, level: 0, maxLevel: item.maxLevel || 1 });
    }
  }

  track(name) {
    const object = this.objects.get(name);
    if (!object) return;

    object.level = (object.level + 1) % (object.maxLevel + 1);
  }

  select(name) {
    const object = this.objects.get(name);
    if (!object) return;

    if (this.selected === object) {
      return this.unselect();
    }

    if (this.selected) {
      this.unselect();
    }
    this.selected = object;
    object.selected = true;
  }

  unselect() {
    if (this.selected) {
      delete this.selected.selected;
      delete this.selected;
    }
  }

  autotrack(name, value) {
    const object = this.objects.get(name);
    if (!object) {
      console.error('tried to set item', name);
      return;
    }

    const oldLevel = object.level;
    object.level = Math.min(value, object.maxLevel);
    return oldLevel != object.level;
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
