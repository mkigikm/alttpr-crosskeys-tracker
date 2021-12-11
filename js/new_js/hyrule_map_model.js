class HyruleMapModel {
  constructor(lwLocations, dwLocations, connectors) {
    this.edges = edges;
    this.connectors = connectors;
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
  }

  addLocation(location, world) {
    const loc = {
      area: location.area,
      found: false,
      hidden: false,
      itemCount: location.itemCount || 0,
      kakariko: location.kakariko,
      name: location.name,
      medallionLocked: location.medallionLocked,
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
    if (!location || location.hidden) return;

    if (location.type === 'drop') {
      location.key = location.key || 0;
      location.key = mod(location.key + 1, 6);
    } else if (location.type === 'item') {
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
        location.key = mod(location.key + 1, 10);
      }
    }
  }

  placeItem(name, item) {
    const location = this.locations.get(name);
    if (!location || location.medallionLocked) return;

    location.item = item.name;
    location.hidden = false;
  }

  placePoi(name, poi) {
    const location = this.locations.get(name);
    debugger
    if (location.type === 'entrance' && poi.type === 'drop') {
      poi.name = poi.name + '-entrance';
      poi.type = 'entrance';
    }
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

  addConnector(name) {
    const location = this.locations.get(name);
    if (location.type === 'item') return;
    if (this.connecting) {
      this.connectors.addConnection(this.connecting, location);
      delete this.connecting;
    } else {
      this.connecting = location;
    }
  }

  addSecondaryConnector(name) {
    const location = this.locations.get(name);
    if (this.connecting) {
      this.connectors.addConnection(this.connecting, location, 'lightblue');
      delete this.connecting;
    } else {
      this.connecting = location;
    }
  }
}
