const medallionList = ['bombos', 'ether', 'quake'];

class HyruleMap {
  constructor() {
    this.locations = new Map();
    this.pois = new Map();

    const lwMapEl = document.getElementById('lw-map');
    const dwMapEl = document.getElementById('dw-map');

    const areas = new Set();

    let totalItems = 0;
    for (const location of lwLocations) {
      this.addLocation(location, lwMapEl, 'lightworld');
      areas.add(location.area);
      totalItems += location.itemCount || 0;
      if (location.type === 'item') {
        totalItems += 1;
      }
    }
    for (const location of dwLocations) {
      this.addLocation(location, dwMapEl, 'darkworld');
      areas.add(location.area);
      totalItems += location.itemCount || 0;
      if (location.type === 'item') {
        totalItems += 1;
      }
    }
    console.log(totalItems);

    this.render(true);
    for (const mapEl of [lwMapEl, dwMapEl]) {
      mapEl.addEventListener('click', e => this.track(e.target));
      mapEl.addEventListener('f', e => display.clearText());
      mapEl.addEventListener('contextmenu', e => {
        this.untrack(e.target);
        event.preventDefault();
      });
    }
    for (const location of this.locations.values()) {
      location.el.addEventListener('mouseenter', e => this.displayText(e.target));
    }

    document.getElementById('portal').addEventListener('click', e => {
      if (dwMapEl.style.display === 'none') {
        lwMapEl.style.display = 'none';
        dwMapEl.style.display = 'block';
      } else {
        lwMapEl.style.display = 'block';
        dwMapEl.style.display = 'none';
      }
    });
  }

  addLocation(location, mapEl, world) {
    const el = document.createElement("div");
    el.dataset.name = location.name;
    el.style.left = `${location.x / 2}px`;
    el.style.top = `${location.y / 2}px`;
    this.locations.set(location.name, {
      area: location.area,
      name: location.name,
      el: el,
      hidden: false,
      medallionLocked: location.medallionLocked,
      requirement: location.requirement,
      type: location.type || 'entrance',
      vanityIcon: location.vanityIcon,
      world: world,
      x: location.x / 2 + 10,
      y: location.y / 2 + 10,
    });
    mapEl.appendChild(el);
  }

  render(dontRefreshConnectors) {
    let currentAreas = new Set(['lw-main']);
    if (typeof inventory !== 'undefined' && typeof 'dungeons' !== 'undefined') {
      currentAreas = availableAreas(this, inventory, dungeons);
    }

    for (const location of this.locations.values()) {
      let fallbackClass = location.type;
      if (location.medallionLocked && location.medallion) {
        fallbackClass = medallionList[location.medallion - 1];
      } else if (location.vanityIcon) {
        fallbackClass = location.vanityIcon;
      }

      location.el.className = 'location';
      location.el.classList.add(location.poi || fallbackClass);
      location.el.classList.toggle('hidden', location.hidden);
      if (typeof inventory !== 'undefined' && typeof dungeons !== 'undefined') {
        if (!location.hidden && !location.poi) {
          if (currentAreas.has(location.area) && itemRequirements(location, this, inventory, dungeons)) {
            location.el.classList.add('checkable');
          } else {
            location.el.classList.add('uncheckable');
          }
        }
      }
    }
    !dontRefreshConnectors && connectors.draw();
  }

  track(el) {
    const location = this.locations.get(el.dataset.name);
    if (!location) {
      controlPanel.clearSelection();
      return;
    }

    if (controlPanel.type) {
      if (controlPanel.type === location.type) {
        this.pois.delete(location.poi);
        this.updateUniquePoi(location);
        location.poi = controlPanel.poi || controlPanel.item;
        location.hidden = false;
      }
    } else {
      location.hidden = !location.hidden;
    }
    controlPanel.clearSelection();
    inventory.render();
    this.render();
  }

  updateUniquePoi(location) {
    if (controlPanel.poi != 'dark' && controlPanel.poi != 'chest' && controlPanel.poi) {
      const currentPoi = this.pois.get(controlPanel.poi);
      if (currentPoi) {
        currentPoi.poi = null;
      }
      this.pois.set(controlPanel.poi, location);
    }
  }

  trackOneOfManyPois(location) {
    location.poi = controlPanel.poi;
    location.hidden = false;
  }

  clearPoi(poi) {
    const location = this.pois.get(poi);
    if (location) {
      this.pois.delete(poi);
      location.poi = null;
      location.hidden = false;
    }
    controlPanel.render();
    this.render();
  }

  untrack(el) {
    const location = this.locations.get(el.dataset.name);
    if (!location) {
      return;
    }
    if (location.medallionLocked && !location.hidden && !location.poi) {
      location.medallion = location.medallion || 0;
      location.medallion = mod(location.medallion + 1, 4);
    } else {
      if (location.poi) {
        this.pois.delete(location.poi);
        location.poi = null;
      }
      location.hidden = false;
    }
    controlPanel.render();
    this.render();
  }

  displayText(el) {
    display.setText(el.dataset.name);
  }
}

const hyruleMap = new HyruleMap();
