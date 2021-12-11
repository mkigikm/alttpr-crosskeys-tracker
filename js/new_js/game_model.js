class GameModel {
  constructor(hyruleMap, inventory, dungeons, controlPanel, edges, connections, connectors) {
    this.hyruleMap = hyruleMap;
    this.inventory = inventory;
    this.dungeons = dungeons;
    this.dungeonProgress = dungeons;
    this.controlPanel = controlPanel;
    this.edges = edges;
    this.connections = connections;
    this.connectors = connectors;
  }

  requirements(location) {
    const dam = this.hyruleMap.pois.get('dam');
    return !location.requirement || location.requirement.split('-').every((req) => {
      switch (req) {
      case 'pendants':
        return this.dungeons.completedPendants();
      case 'barrier':
        return this.inventory.objects.get('sword').level > 1 ||
          this.inventory.objects.get('cape').level > 0 ||
          this.dungeons.completedCastleTower();
      case 'aga1':
        return this.dungeons.completedCastleTower();
      case 'dam':
        return dam && (dam.world === 'lw' || this.inventory.objects.get('mearl').level > 0);
      case 'smith':
        // TODO access to frog area
        return this.hyruleMap.pois.has('smith');
      case 'bigbomb':
        return this.dungeons.completedRedCrystals() && this.hyruleMap.pois.has('bomb-shop');
      case 'gt':
        return this.dungeons.completedGannonsTower();
      case 'medallion':
        return this.inventory.hasMedallion(location.medallion);
      case 'crystals':
        return this.dungeons.completedCrystals();
      case 'climb':
        return hyruleMap.pois.has('climb-top');
      default:
        return this.inventory.objects.get(req.replace('+', '')).level > (req.endsWith('+') ? 1 : 0);
      }
    });
  }

  reachableLocations() {
    const areas = this.startingAreas();
    const checkedAreas = new Set(areas);
    const edges = this.currentEdges();

    while (areas.length > 0) {
      const currentArea = areas.shift();
      for (const edge of edges) {
        if (edge.a === currentArea && this.requirements(edge) && !checkedAreas.has(edge.b)) {
          checkedAreas.add(edge.b);
          areas.push(edge.b);
        }
      }
    }

    return checkedAreas;
  }

  startingAreas() {
    const areas = [this.hyruleMap.locations.get('Link\'s House').area];

    if (this.inventory.objects.get('flute').level > 0) {
      areas.push('dm-south-west');
      if (this.inventory.objects.get('glove').level > 1) {
        areas.push('mire');
      }
    }

    for (const startingLoc of ['sanctuary-entrance', 'old-man-main', 'old-man-back']) {
      const poi = this.hyruleMap.pois.get(startingLoc);
      if (poi && !areas.includes(poi.area) && (startingLoc === 'sanctuary-entrance' || this.hyruleMap.hasOldManItem())) {
        areas.push(poi.area);
      }
    }

    return areas;
  }

  currentEdges() {
    const currentEdges = [...this.edges];

    for (const [a, b, , ,] of this.connections) {
      const aLocation = this.hyruleMap.pois.get(a);
      const bLocation = this.hyruleMap.pois.get(b);
      if (aLocation && bLocation && (this.requirements(aLocation) || this.requirements(bLocation))) {
        currentEdges.push({a: aLocation.area, b: bLocation.area});
        currentEdges.push({b: aLocation.area, a: bLocation.area});
      }
    }
    for (const [aLocation, bLocation, ,] of this.connectors.connections) {
      currentEdges.push({a: aLocation.area, b: bLocation.area});
      currentEdges.push({b: aLocation.area, a: bLocation.area});
    }

    return currentEdges;
  }
}
