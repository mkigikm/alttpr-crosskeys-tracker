function availableAreas(hyruleMap, inventory, dungeons) {
  const allLocations = new Set();
  for (const l of hyruleMap.locations.values()) {
    allLocations.add(l.area);
  }
  for (const e of edges) {
    if (!allLocations.has(e.a)) {
      console.log('bad area ' + e.a);
    }
    if (!allLocations.has(e.b)) {
      console.log('bad area ' + e.b);
    }
  }
  const areas = ['lw-main'];
  const checkedAreas = new Set();
  checkedAreas.add('lw-main');

  if (inventory.objects.get('flute').level > 0) {
    areas.push('dm-south-west');
    checkedAreas.add('dm-south-west');
    if (inventory.objects.get('glove').level > 1) {
      areas.push('mire');
      checkedAreas.add('mire');
    }
  }

  for (const startingArea of ['sanctuary', 'old-man-main', 'old-man-back']) {
    const poi = hyruleMap.pois.get(startingArea);
    if (poi && !checkedAreas.has(poi.area)) {
      areas.push(poi.area);
      checkedAreas.add(poi.area);
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

  if (hyruleMap && inventory && dungeons) {
    while (areas.length > 0) {
      const currentArea = areas.shift();
      for (const edge of currentEdges) {
        if (edge.a === currentArea && itemRequirements(edge, hyruleMap, inventory, dungeons)) {
          if (!checkedAreas.has(edge.b)) {
            checkedAreas.add(edge.b);
            areas.push(edge.b);
          }
        }
      }
    }
  }

  return checkedAreas;
}

function itemRequirements(location, hyruleMap, inventory, dungeons) {
  if (!hyruleMap || !inventory || !dungeons) {
    return false;
  }

  if (!location.requirement) {
    return true;
  }

  if (location.requirement.startsWith('mearl-') && inventory.objects.get('mearl').level === 0) {
    return false;
  }

  const requirement = location.requirement.replace('mearl-', '');
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
  case 'defeat-aga1':
      return dungeons.completedCastleTower();
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
    return inventory.hasMedallion(location.medallion);
  case 'crystals':
    return dungeons.completedCrystals();
  case 'tablet':
    return inventory.objects.get('sword').level > 1 &&
      inventory.objects.get('book').level > 0;
  case 'mitts':
    return inventory.objects.get('glove').level > 1;
  case 'hammer-glove':
    return inventory.objects.get('hammer').level > 0 && inventory.objects.get('glove').level > 0;
  case 'hammer-mitts':
    return inventory.objects.get('hammer').level > 0 && inventory.objects.get('glove').level > 1;
  default:
    return inventory.objects.get(requirement).level > 0;
  }
  return false;
}
