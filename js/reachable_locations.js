function availableAreas(hyruleMap, inventory, dungeons) {
  const areas = ['lw-main'];
  const checkedAreas = new Set();
  checkedAreas.add('lw-main');

  if (inventory.objects.get('flute').level > 0) {
    areas.push('dm-south-west');
    checkedAreas.add('dm-south-west');
    if (inventory.objects.get('glove').level > 1) {
      areas.push('mire-area');
      checkedAreas.add('mire-area');
    }
  }

  if (hyruleMap.hasOldManItem()) {
    for (const startingArea of ['old-man-main', 'old-man-back']) {
      const poi = hyruleMap.pois.get(startingArea);
      if (poi && !checkedAreas.has(poi.area)) {
        areas.push(poi.area);
        checkedAreas.add(poi.area);
      }
    }
  }

  const currentEdges = [...edges];
  for (const [a, b, color, twoWay] of connections) {
    const aLocation = hyruleMap.pois.get(a);
    const bLocation = hyruleMap.pois.get(b);
    if (aLocation && bLocation) {
      currentEdges.push({a: aLocation.area, b: bLocation.area});
      currentEdges.push({b: aLocation.area, a: bLocation.area});
    }
  }

  while (areas.length > 0) {
    const currentArea = areas.shift();
    for (const edge of currentEdges) {
      if (edge.a === currentArea && itemRequirements(edge, hyruleMap, inventory, dungeons) && !checkedAreas.has(edge.b)) {
        checkedAreas.add(edge.b);
        areas.push(edge.b);
      }
    }
  }

  return checkedAreas;
}

function itemRequirements(location, hyruleMap, inventory, dungeons) {
  if (!location.requirement) {
    return true;
  }

  for (const requirement of location.requirement.split("-")) {
    switch (requirement) {
    case 'pendants':
      return dungeons.completedPendants();
    case 'lumberjack':
      return inventory.objects.get('boots').level > 0 &&
        dungeons.completedCastleTower();
    case 'castle-tower':
      return inventory.objects.get('sword').level > 1 ||
        inventory.objects.get('cape').level > 0 ||
        dungeons.completedCastleTower();
    case 'dam':
      return hyruleMap.pois.has('dam');
    case 'tablet':
      return inventory.objects.get('sword').level > 1 &&
        inventory.objects.get('book').level > 0;
    case 'smith':
      // TODO access to frog area
      return hyruleMap.pois.has('smith') && inventory.objects.get('glove').level > 1;
    case 'big-bomb':
      return dungeons.completedRedCrystals() && hyruleMap.pois.has('bomb-shop');
    case 'gt':
      return dungeons.completedGannonsTower();
    case 'medallion':
      return inventory.hasMedallion(location.medallion) && inventory.objects.get('sword').level > 0;
    case 'crystals':
      return dungeons.completedCrystals();
    case 'tablet':
      return inventory.objects.get('sword').level > 1 &&
        inventory.objects.get('book').level > 0;
    case 'mitts':
      return inventory.objects.get('glove').level > 1;
    default:
      return inventory.objects.get(requirement).level > 0;
  }
  return false;
}
