const MEDALLION_LIST = ['bombos', 'ether', 'quake'];
const ITEM_KEY_LIST = ['key', 'big-key', 'map', 'rupee'];
const DROP_KEY_LIST = ['key', 'big-key', 'map', 'rupee', 'gibdo'];
const ENTRANCE_KEY_LIST = ['chest', 'dark', 'fairy-drop', 'shop'].concat(DROP_KEY_LIST);

class HyruleMapView {
  constructor(lwEl, dwEl, game) {
    this.lwEl = lwEl;
    this.dwEl = dwEl;
    this.game = game;
    this.attachToDOM();
  }

  attachToDOM() {
    for (const loc of this.game.hyruleMap.locations.values()) {
      const el = document.createElement('div');
      el.dataset.name = loc.name;
      el.style.left = `${loc.x - 10}px`;
      el.style.top = `${loc.y - 10}px`;
      if (loc.world === 'lw') {
        this.lwEl.appendChild(el);
      } else {
        this.dwEl.appendChild(el);
      }
    }
  }

  render() {
    const areas = this.game.reachableLocations();

    for (const worldEl of [this.lwEl, this.dwEl]) {
      for (const locEl of worldEl.getElementsByTagName('div')) {
        const loc = this.game.hyruleMap.locations.get(locEl.dataset.name);
        locEl.className = 'location';
        if (!loc) continue;

        if (loc.hidden) {
          locEl.classList.add('hidden');
          continue;
        }

        if (loc.name === 'Link\'s House') {
          locEl.classList.add('chest');
        } else if (loc.item) {
          const object = this.game.inventory.objects.get(loc.item);
          if (loc.item === 'sword') {
            locEl.classList.add(object.level > 0 ? 'mastersword' : loc.item);
          } else if (loc.item === 'glove') {
            locEl.classList.add(object.level > 0 ? 'mitts' : loc.item);
          } else {
            locEl.classList.add(loc.item);
          }
        } else if (loc.poi && !loc.key) {
          locEl.classList.add(this.locationPoiClass(loc.poi));
        } else if (loc.medallion) {
          locEl.classList.add(MEDALLION_LIST[loc.medallion - 1]);
        } else if (loc.key) {
          if (loc.type === 'drop') {
            locEl.classList.add(DROP_KEY_LIST[loc.key - 1]);
          } else if (loc.type === 'item') {
            locEl.classList.add(ITEM_KEY_LIST[loc.key - 1]);
          } else {
            locEl.classList.add(ENTRANCE_KEY_LIST[loc.key - 1]);
          }
        } else if (!loc.medallionLocked) {
          locEl.classList.add(this.locationClass(loc));
        }

        if (areas.has(loc.area) && this.game.requirements(loc)) {
          locEl.classList.add('checkable');
        } else {
          locEl.classList.add('uncheckable');
        }
      }
    }

    this.lwEl.style.display = this.game.hyruleMap.world === 'lw' ? 'block' : 'none';
    this.dwEl.style.display = this.game.hyruleMap.world === 'dw' ? 'block' : 'none';
  }

  locationPoiClass(poi) {
    switch (poi.name) {
    case 'HC':
      return 'hyrule-main';
    case 'EP':
      return 'eastern';
    case 'DP':
      return 'desert-back';
    case 'TH':
      return 'hera';
    case 'CT':
      return 'castle-tower';
    case 'PD':
      return 'pod';
    case 'SP':
      return 'swamp-palace';
    case 'SW':
      return 'skull-woods';
    case 'TT':
      return 'thieves-town';
    case 'IP':
      return 'ice-palace';
    case 'MM':
      return 'misery-mire';
    case 'TR':
      return 'tr-back';
    case 'GT':
      return 'gt';
    }

    return poi.name;
  }

  locationClass(location) {
    switch (location.name) {
    case 'Pedestal':
      return 'pedestal';
    case 'Bottle Vendor':
      return 'bottle-merchant';
    case 'Hobo':
      return 'hobo';
    case 'King Zora':
      return 'king-zora';
    case 'Purple Chest':
      return 'purple-chest';
    case 'Stumpy':
      return 'stumpy';
    case 'Catfish':
      return 'catfish';
    case 'Skull Woods East':
    case 'Skull Woods Central':
    case 'Skull Woods West':
      return 'gibdo';
    }

    if (location.type === 'item') {
      return 'item';
    }
    if (location.type === 'drop') {
      return 'drop';
    }
    if (location.area.startsWith('dm-') ||
        location.area.startsWith('ddm-') ||
        location.area.startsWith('tr-') ||
        location.area === 'spiral-cave-top-ledge' ||
        location.area === 'mimic-cave-ledge') {
      return 'boulder';
    } else if (location.kakariko) {
      return 'kakariko';
    } else {
      return 'entrance';
    }
  }
}
