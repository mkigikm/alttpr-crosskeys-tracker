class InventoryModel {
  constructor() {
    this.objects = new Map();

    for (const item of totalInventory) {
      this.objects.set(item.name, { level: 0, maxLevel: item.progressive ? 2 : 1 });
    }
  }

  track(name) {
    const name = el.dataset.name;
    const object = this.objects.get(name);
    if (!object) return;

    object.level = (object.level + 1) % (object.maxLevel + 1);
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
