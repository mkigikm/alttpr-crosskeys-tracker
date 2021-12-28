class ControlPanelModel {
  constructor() {
    this.selectedControls = 'dropdowns';
  }

  selectControls(selection) {
    this.selectedControls = selection;
  }

  select(selection) {
    if (this.selected && this.selected.name === selection.name) {
      this.unselect();
    } else {
      this.selected = selection;
    }
  }

  unselect() {
    delete this.selected;
  }

  setDisplayText(text, actuallySet) {
    if (actuallySet) this.displayText = text;
  }

  clearText() {
    delete this.displayText;
  }

  toggleNotes() {
    this.showNotes = !this.showNotes;
  }

  activeSection() {
    return this.showNotes ? 'notes' : this.selectedControls;
  }
}
