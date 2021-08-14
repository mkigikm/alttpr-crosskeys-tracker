class Controller {
  constructor(dungeonView, hyruleMapView, inventoryView, controlPanelView, game, connectors) {
    this.game = game;
    this.dungeonView = dungeonView;
    this.hyruleMapView = hyruleMapView;
    this.inventoryView = inventoryView;
    this.controlPanelView = controlPanelView;
    this.connectors = connectors;
    this.attachToDOM();
    this.render();
  }

  attachToDOM() {
    this.dungeonView.dungeonsEl.addEventListener('click', e => this.dungeonClick(e.target));
    this.dungeonView.dungeonsEl.addEventListener('contextmenu', e => this.dungeonRightClick(e.target));
    for (const el of this.dungeonView.dungeonsEl.childNodes) {
      el.addEventListener('mouseenter', e => this.dungeonMouseEnter(e.target));
      el.addEventListener('mouseleave', () => this.clearDisplayText());
    }

    for (const mapEl of [this.hyruleMapView.lwEl, this.hyruleMapView.dwEl]) {
      mapEl.addEventListener('click', e => this.hyruleMapClick(e.target));
      mapEl.addEventListener('contextmenu', e => this.hyruleMapRightClick(e.target));
      mapEl.addEventListener('dblclick', e => this.hyruleMapDoubleClick(e.target));
      for (const el of mapEl.getElementsByTagName('div')) {
        el.addEventListener('mouseenter', e => this.hyruleMapMouseEnter(e.target));
        el.addEventListener('mouseleave', () => this.clearDisplayText());
      }
    }

    document.getElementById('portal').addEventListener('click', () => this.portalClick());

    this.inventoryView.abuttonEl.addEventListener('click', e => this.inventoryClick(e.target));
    this.inventoryView.ybuttonEl.addEventListener('click', e => this.inventoryClick(e.target));
    this.inventoryView.abuttonEl.addEventListener('contextmenu', e => this.inventoryRightClick(e.target));
    this.inventoryView.ybuttonEl.addEventListener('contextmenu', e => this.inventoryRightClick(e.target));

    this.controlPanelView.controlSelectionEl.addEventListener('click', e => this.controlSelectionClick(e.target));
    this.controlPanelView.controlSelectionEl.addEventListener('contextmenu', () => this.controlSelectionRightClick());
    for (const el of this.controlPanelView.selectionEls) {
      el.addEventListener('click', e => this.controlPoiClick(e.target));
      el.addEventListener('contextmenu', () => {});
      el.addEventListener('mouseenter', e => this.controlPoiMouseEnter(e.target));
      el.addEventListener('mouseleave', () => this.clearDisplayText());
    }
    this.controlPanelView.outstandingEl.addEventListener('click', e => this.locationClick(e.target, true));
    this.controlPanelView.foundEl.addEventListener('click', e => this.locationClick(e.target, false));

    this.controlPanelView.locationInput.addEventListener('input', e => this.locationChange(e.target));
  }

  dungeonClick(el) {
    const dungeonName = el.parentElement.dataset.name;
    if (!dungeonName) return;

    const field = el.dataset.field;
    this.game.dungeons.track(dungeonName, field, 1);
    this.render();
  }

  dungeonRightClick(el) {
    const dungeonName = el.parentElement.dataset.name;
    const field = el.dataset.field;
    if (!dungeonName) return;

    if (field === 'completed') {
      this.clearSelected();
      this.game.dungeons.select(dungeonName);
    } else {
      this.game.dungeons.track(dungeonName, field, -1);
    }
    this.render();
  }

  hyruleMapClick(el) {
    const locationName = el.dataset.name;
    if (!locationName) return;

    if (this.game.inventory.selected) {
      // this.game.hyruleMap.placePoi(locationName, { name: this.game.inventory.selected.name, type: 'item' });
      this.game.hyruleMap.placeItem(locationName, { name: this.game.inventory.selected.name, type: 'item' });
      this.clearSelected();
    } else if (this.game.dungeons.selected) {
      const dungeon = this.translateDungeon(this.game.dungeons.selected);
      this.game.hyruleMap.placePoi(locationName, { name: dungeon, type: 'entrance', unique: true });
      this.clearSelected();
    } else if (this.game.controlPanel.selected) {
      this.game.hyruleMap.placePoi(locationName, this.game.controlPanel.selected);
      this.clearSelected();
    } else {
      this.game.hyruleMap.track(locationName);
    }
    this.setMapText(locationName);
    this.render();
  }

  hyruleMapRightClick(el) {
    const locationName = el.dataset.name;
    if (!locationName) return;

    this.game.hyruleMap.cycle(locationName);
    this.setMapText(locationName);
    this.render();
  }

  hyruleMapDoubleClick(el) {
    const locationName = el.dataset.name;
    if (!locationName) return;

    this.game.hyruleMap.untrack(locationName);
    this.setMapText(locationName);
    this.render();
  }

  portalClick() {
    this.game.hyruleMap.enterPortal();
    this.render();
  }

  inventoryClick(el) {
    this.game.inventory.unselect();
    this.game.inventory.track(el.classList[0]);
    this.render();
  }

  inventoryRightClick(el) {
    this.clearSelected();
    this.game.inventory.select(el.classList[0]);
    this.render();
  }

  controlSelectionClick(el) {
    const id = el.id.replace('-toggle', '');
    this.game.controlPanel.selectControls(id);
    this.render();
    if (id === 'locations') {
      this.controlPanelView.locationInput.focus();
      this.controlPanelView.locationInput.select();
    }
  }

  controlSelectionRightClick() {
    this.game.controlPanel.toggleNotes();
    this.render();
    if (this.game.controlPanel.activeSection() === 'notes') {
      this.controlPanelView.notesTextEl.focus();
      this.controlPanelView.notesTextEl.select();
    }
  }

  controlPoiClick(el) {
    this.clearSelected();
    const name = el.classList[0];
    // TODO make less shitty
    const type = ['lumberjack-drop', 'sanctuary', 'fairy-drop', 'hideout','well', 'magic-bat', 'uncle', 'ganon'].includes(name) ? 'drop' : 'entrance';
    this.game.controlPanel.select({
      name: name,
      type: type,
      unique: name != 'chest' && name != 'dark',
    });
    this.render();
  }

  controlPoiMouseEnter(el) {
    const name = el.classList[0];
    const poi = this.game.hyruleMap.pois.get(name);
    if (poi) {
      this.game.controlPanel.setDisplayText(`${name} at ${poi.name}`);
    } else {
      this.game.controlPanel.setDisplayText(name);
    }
    this.render();
  }

  hyruleMapMouseEnter(el) {
    this.setMapText(el.dataset.name);
    this.render();
  }

  setMapText(locationName) {
    const location = this.game.hyruleMap.locations.get(locationName);
    const poi = location.poi;
    if (poi?.unique || poi?.type === 'item') {
      this.game.controlPanel.setDisplayText(`${poi.name} at ${locationName}`);
    } else if ((location.type === 'item' || location.type === 'drop') && location.key > 0) {
      let item;
      if (location.key === 1) {
        item = 'key';
      } else if (location.key === 2) {
        item = 'big key';
      } else if (location.key === 3) {
        item = 'map';
      } else {
        item = 'rupees';
      }
      this.game.controlPanel.setDisplayText(`${item} at ${locationName}`);
    } else if (location.key > 0) {
      let item;
      if (location.key === 1) {
        item = 'chest';
      } else if (location.key === 2) {
        item = 'dark cave';
      } else if (location.key === 3) {
        item = 'luck fairy';
      } else if (location.key === 4) {
        item = 'shop';
      } else if (location.key === 5) {
        item = 'key';
      } else if (location.key === 6) {
        item = 'big key';
      } else if (location.key === 7) {
        item = 'map';
      } else {
        item = 'rupees';
      }
      this.game.controlPanel.setDisplayText(`${item} at ${locationName}`);
    } else {
      this.game.controlPanel.setDisplayText(locationName);
    }
  }

  locationChange(el) {
    this.game.controlPanel.locationFilter = (el.value || '').toLowerCase();
    this.render();
  }

  locationClick(el, isFound) {
    const name = el.textContent;
    const location = this.game.hyruleMap.locations.get(name);
    if (!location) return;

    location.found = isFound;
    this.render();
    this.controlPanelView.locationInput.focus();
    this.controlPanelView.locationInput.select();
  }

  dungeonMouseEnter(el) {
    const dungeon = this.translateDungeon(el.childNodes[0].textContent);
    const poi = this.game.hyruleMap.pois.get(dungeon);
    if (poi) {
      this.game.controlPanel.setDisplayText(`${dungeon} at ${poi.name}`);
    }
    this.render();
  }

  translateDungeon(dungeon) {
    if (dungeon === 'HC') {
      return 'hyrule-main';
    } else if (dungeon === 'DP') {
      return 'desert-back';
    } else if (dungeon === 'TR') {
      return 'tr-back';
    }
    return dungeon;
  }

  clearSelected() {
    this.game.inventory.unselect();
    this.game.dungeons.unselect();
    this.game.controlPanel.unselect();
  }

  clearDisplayText() {
    this.game.controlPanel.setDisplayText('');
    this.render();
  }

  render() {
    this.dungeonView.render();
    this.hyruleMapView.render();
    this.inventoryView.render();
    this.controlPanelView.render();
    // this.connectors.draw();
  }
}
