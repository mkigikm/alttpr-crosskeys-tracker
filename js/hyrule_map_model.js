const medallionList = ['bombos', 'ether', 'quake'];

class HyruleMapModel {
  constructor() {
    this.locations = new Map();
    this.pois = new Map();

    for (const location of lwLocations) {
      this.addLocation(location, 'lw');
    }
    for (const location of dwLocations) {
      this.addLocation(location, dwMapEl, 'dw');
    }
  }

  addLocation(location, mapEl, world) {
    this.locations.set(location.name, {
      area: location.area,
      hidden: false,
      name: location.name,
      medallionLocked: location.medallionLocked,
      requirement: location.requirement,
      type: location.type || 'entrance',
      world: world,
      x: location.x / 2 + 10,
      y: location.y / 2 + 10,
    });
  }

  track(name) {
    const location = this.locations.get(name);
    if (!location) {
      return;
    }
    location.hidden = !location.hidden;
  }

  untrack(name) {
    const location = this.locations.get(name);
    if (!location) {
      return;
    }

    if (location.poi) {
      this.pois.delete(location.poi.name);
      location.poi = null;
    }
    location.hidden = false;
  }

  trackMedallion(name) {
    const location = this.locations.get(name);
    if (!location) {
      return;
    }

    location.medallion = location.medallion || 0;
    location.medallion = mod(location.medallion + 1, 4);
  }

  placePoi(name, poi) {
    const location = this.locations.get(name);
    if (!location || location.type !== poi.type) {
      return;
    }

    if (location.poi) {
      this.pois.delete(location.poi.name);
    }

    if (poi.unique) {
      const currentPoi = this.pois.get(poi.name);
      if (currentPoi) {
        currentPoi.poi = null;
      }
      this.pois.set(poi.name, location);
    }
    location.poi = poi;
    location.hidden = false;
  }

  clearPoi(poi) {
    const location = this.pois.get(poi);
    if (location) {
      this.pois.delete(poi);
      location.poi = null;
      location.hidden = false;
    }
  }

  hasOldManItem() {
    return this.locations.get('Old Man Item').hidden;
  }
}
