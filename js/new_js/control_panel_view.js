const PANELS = [
  {
    className: 'well',
    id: 'dropdowns',
    rows: [
      ['lumberjack-drop', 'sanctuary', 'fairy-drop', 'hideout'],
      ['well', 'magic-bat', 'uncle', 'ganon'],
    ],
  },
  {
    className: 'info',
    id: 'info',
    rows: [
      ['chest', 'dark', 'potion-shop', 'smith', 'mimic', 'spike'],
      ['bomb-shop', 'dam', 'sick-kid', 'saha', 'library'],
    ],
  },
  {
    className: 'crystal',
    id: 'dungeon-connectors',
    rows: [
      ['hyrule-west', 'hyrule-main', 'hyrule-east'],
      ['desert-west', 'desert-main', 'desert-east', 'desert-back'],
      ['tr-main', 'tr-west', 'tr-east', 'tr-back'],
    ],
  },
  {
    className: 'elder',
    id: 'two-sided-connectors',
    rows: [
      ['climb-bottom', 'climb-top', 'old-man-main', 'old-man-back', 'return-top', 'return-bottom', 'fairy-top', 'fairy-bottom'],
      ['elder-west', 'elder-east', 'brothers-west', 'brothers-east', 'spiral-top', 'spiral-bottom'],
      ['hookshot-cave-entrance', 'hookshot-cave-exit', 'bumper-cave-entrance', 'bumper-cave-exit', 'superbunny-bottom', 'superbunny-top'],
    ]
  },
  {
    className: 'spec-rock-item',
    id: 'three-sided-connectors',
    rows: [
      ['paradox-2items', 'paradox-5items', 'paradox-exit'],
      ['spec-rock-underpass', 'spec-rock-exit', 'spec-rock-item'],
    ],
  },
];

class ControlPanelView {
  constructor(controlsEl, displayEl, game) {
    this.controlsEl = controlsEl;
    this.displayEl = displayEl;
    this.game = game;
    this.attachToDOM();
  }

  attachToDOM() {
    const controlSelectionEl = document.createElement('div');
    controlSelectionEl.className = 'control-selection';
    this.controlSelectionEl = controlSelectionEl;
    this.controlsEl.appendChild(controlSelectionEl);
    this.selectionEls = [];

    for (const panel of PANELS) {
      const toggleEl = document.createElement('div');
      toggleEl.id = `${panel.id}-toggle`;
      toggleEl.className = panel.className;
      controlSelectionEl.appendChild(toggleEl);

      const panelEl = document.createElement('div');
      panelEl.id = panel.id;
      panelEl.className = 'control-specifics';
      panelEl.classList.add(panel.rows.length === 2 ? 'two-rows' : 'three-rows');
      this.controlsEl.appendChild(panelEl);

      for (const row of panel.rows) {
        const rowEl = document.createElement('div');
        panelEl.appendChild(rowEl);
        switch (row.length) {
        case 3:
          rowEl.className = 'three-columns';
          break;
        case 4:
          rowEl.className = 'four-columns';
          break;
        case 5:
          rowEl.className = 'five-columns';
          break;
        case 6:
          rowEl.className = 'six-columns';
          break;
        case 8:
          rowEl.className = 'eight-columns';
          break;
        }
        for (const selection of row) {
          const selectionEl = document.createElement('div');
          selectionEl.className = selection;
          rowEl.appendChild(selectionEl);
          this.selectionEls.push(selectionEl);
        }
      }
    }
    this.attachLocationsToDOM(controlSelectionEl);
    this.attachNotesToDOM();
  }

  attachLocationsToDOM(controlSelectionEl) {
    const toggleEl = document.createElement('div');
    toggleEl.id = 'locations-toggle';
    controlSelectionEl.appendChild(toggleEl);

    const locationEl = document.createElement('div');
    locationEl.id = 'locations';
    locationEl.className = 'control-specifics';
    locationEl.classList.add('one-row');
    this.controlsEl.appendChild(locationEl);

    const rowEl = document.createElement('div');
    rowEl.className = 'three-columns';
    locationEl.appendChild(rowEl);

    this.locationInput = document.createElement('input');
    rowEl.appendChild(this.locationInput);

    this.outstandingEl = document.createElement('ul');
    rowEl.appendChild(this.outstandingEl);

    this.foundEl = document.createElement('ul');
    rowEl.appendChild(this.foundEl);
  }

  attachNotesToDOM() {
    const notesEl = document.createElement('div');
    notesEl.id = 'notes';
    this.notesTextEl = document.createElement('textarea');
    notesEl.appendChild(this.notesTextEl);
    this.controlsEl.appendChild(notesEl);
  }

  render() {
    for (const panel of PANELS) {
      document.getElementById(panel.id).style.display =
        this.game.controlPanel.activeSection() === panel.id ? 'flex' : 'none';
    }
    document.getElementById('locations').style.display =
      this.game.controlPanel.activeSection() === 'locations' ? 'flex' : 'none';
    for (const selectionEl of this.selectionEls) {
      const name = selectionEl.classList[0];
      selectionEl.classList.toggle('placing2', name === this.game.controlPanel.selected?.name);
      selectionEl.classList.toggle('tracked', this.game.hyruleMap.pois.has(name));
    }
    this.displayEl.textContent = this.game.controlPanel.displayText;
    this.renderLocationLists();
    document.getElementById('notes').style.display = this.game.controlPanel.activeSection() === 'notes' ? 'block' : 'none';
  }

  renderLocationLists() {
    const nameFilter = this.game.controlPanel.locationFilter;

    for (const [el, found] of [[this.outstandingEl, false], [this.foundEl, true]]) {
      const locations = Array.from(this.game.hyruleMap.locations.values())
        .filter(l => !!l.found === found && l.itemCount && (l.name.toLowerCase().indexOf(nameFilter) !== -1 || !nameFilter))
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });

      while (el.firstChild) el.removeChild(el.firstChild);
      for (const loc of locations) {
        const entryEl = document.createElement('li');
        entryEl.textContent = loc.name;
        el.appendChild(entryEl);
      }
    }
  }
}
