class HyruleMapModel {
  constructor(lwLocations, dwLocations, edges) {
    this.edges = edges;
    this.locations = new Map();
    this.locationsByPoi = new Map();
    this.pois = new Map();
    this.world = 'lw';

    for (const location of lwLocations) {
      this.addLocation(location, 'lw');
    }
    for (const location of dwLocations) {
      this.addLocation(location, 'dw');
    }
    this.autotrackLocations = Array.from(this.locations.values()).filter((loc) => loc.type !== 'item' && !loc.medallionLocked);
  }

  addLocation(location, world) {
    const loc = {
      area: location.area,
      autofind: location.autofind,
      autotracker: location.autotracker,
      unMapped: location.unMapped,
      found: false,
      hidden: false,
      itemCount: location.itemCount || 0,
      kakariko: location.kakariko,
      name: location.name,
      medallionLocked: location.medallionLocked,
      poiName: location.poiName,
      requirement: location.requirement,
      type: location.type || 'entrance',
      world: world,
      x: location.x / 2 + 10,
      y: location.y / 2 + 10,
    };
    this.locations.set(location.name, loc);
    if (location.poiName) {
      this.locationsByPoi.set(location.poiName, loc);
    }
  }

  track(name) {
    const location = this.locations.get(name);
    if (!location) return;
    location.hidden = !location.hidden;
    if (location.autofind) {
      location.found = !location.found;
    }
  }

  untrack(name) {
    const location = this.locations.get(name);
    if (!location || location.hidden) return;

    delete location.item;
    delete location.key;
    if (location.poi) {
      const foundLocation = this.locationsByPoi.get(location.poi.name);
      if (foundLocation) {
        foundLocation.found = false;
      }
      this.pois.delete(location.poi.name);
      location.poi = null;
    }
  }

  cycle(name) {
    const location = this.locations.get(name);
    if (!location || location.hidden || location.autofind) return;

    if (location.type === 'drop' || location.type === 'item') {
      location.key = location.key || 0;
      location.key = mod(location.key + 1, 5);
    } else if (location.medallionLocked) {
      location.medallion = location.medallion || 0;
      location.medallion = mod(location.medallion + 1, 4);
    } else {
      if (location.item) {
        delete location.item;
      } else {
        location.key = location.key || 0;
        location.key = mod(location.key + 1, 9);
      }
    }
  }

  markAsChest(name) {
    const location = this.locations.get(name);
    location.key = 1;
  }

  markAsDark(name) {
    const location = this.locations.get(name);
    location.key = 2;
  }

  markAsFairy(name) {
    const location = this.locations.get(name);
    location.key = 3;
  }

  markAsShop(name) {
    const location = this.locations.get(name);
    location.key = 4;
  }

  markAsRupees(name) {
    const location = this.locations.get(name);
    location.key = 8;
  }

  placeItem(name, item) {
    const location = this.locations.get(name);
    if (!location || location.medallionLocked) return;

    location.item = item.name;
    location.hidden = false;
  }

  placePoi(name, poi) {
    const location = this.locations.get(name);
    if (!location || location.type !== poi.type || location.medallionLocked) return;

    if (location.poi) {
      this.pois.delete(location.poi.name);
    }

    if (poi.unique) {
      const currentPoi = this.pois.get(poi.name);
      if (currentPoi) {
        delete currentPoi.poi;
      }
      this.pois.set(poi.name, location);
    }
    location.poi = poi;
    location.hidden = false;
    delete location.key;
    delete location.medallion;
    delete location.item;

    const foundLocation = this.locationsByPoi.get(poi.name);
    if (foundLocation) {
      foundLocation.found = true;
    }
  }

  enterPortal() {
    this.world = this.world === 'lw' ? 'dw' : 'lw';
  }

  hasOldManItem() {
    return this.locations.get('Old Man Item').hidden;
  }

  findLocation(name) {
    for (const location of this.locations.values()) {
      if (location.name === name) {
        location.found = true;
        return;
      }
    }
  }

  unfindLocation(name) {
    for (const location of this.locations.values()) {
      if (location.name === name) {
        location.found = false;
        return;
      }
    }
  }

  caveItems() {
    return Array.from(this.locations.values()).reduce((total, location) => {
      return total + (!location.found ? location.itemCount : 0);
    }, 0);
  }

  autotrack(state, previousState, hasLamp) {
    if (state.indoors === previousState.indoors) return false;

    let location;
    let entranceState;
    if (state.indoors) {
      location = this.autotrackLocations.find((loc) => {
        return loc.autotracker.dungeonId === state.dungeonId ||
          loc.autotracker.dropId === state.dungeonId ||
          (loc.autotracker.dropIds || []).includes(state.dungeonId)
      });
      entranceState = previousState;
    } else {
      location = this.autotrackLocations.find((loc) => loc.autotracker.roomId === previousState.roomId);
      entranceState = state;
    }
    if (!location || location.name.startsWith('Skull Woods')) return false;

    let winningDistance = this.mapDistance(this.autotrackLocations[0], location, entranceState);
    const entrance = this.autotrackLocations.reduce((prev, cur) => {
      const curDistance = this.mapDistance(cur, location, entranceState);
      if (curDistance < winningDistance) {
        winningDistance = curDistance;
        return cur;
      } else {
        return prev;
      }
    });
    if (winningDistance === Infinity) {
      console.log('winning distance infinity', state, previousState);
      return false;
    }

    if (location.poiName) {
      if (location.autotracker.dark && !hasLamp) {
        if (entrance.poi) {
          return false;
        } else {
          this.markAsDark(entrance.name);
          return true;
        }
      }
      const currentPoi = this.pois.get(location.poiName);
      if (currentPoi && currentPoi.name === entrance.name) {
        console.log('not setting poi because it has already been set', location.poiName, entrance.name);
        return false;
      }
      this.placePoi(entrance.name, {name: location.poiName, type: location.type, unique: true});
      return true;
    } else if (state.indoors && location.itemCount) {
      this.markAsChest(entrance.name);
      location.found = true;
      return true;
    } else if (location.name === 'Luck Fairy') {
      this.markAsFairy(entrance.name)
      return true;
    } else if (location.autotracker.isShop) {
      this.markAsShop(entrance.name);
      return true;
    } else if (location.autotracker.isRupees) {
      this.markAsRupees(entrance.name);
      return true;
    } else if (state.indoors && !entrance.hidden) {
      entrance.hidden = true;
      return true;
    }
    return false;
  }

  mapDistance(location, entrance, state) {
    if (location.autotracker.area === state.overworldIndex && location.type === entrance.type) {
      const xDiff = location.autotracker.coords[0] - state.coords[0];
      const yDiff = location.autotracker.coords[1] - state.coords[1];
      return xDiff * xDiff + yDiff * yDiff;
    }
    return Infinity;
  }
}
