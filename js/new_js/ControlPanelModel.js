class ControlPanelModel {
  constructor() {
    this.selectedControls = 'dropdowns';
  }

  selectControls(selection) {
    this.selectedControls = selection;
  }

  select(selection) {
    this.selected = selection;
  }

  unselect() {
    delete this.selected;
  }
}
