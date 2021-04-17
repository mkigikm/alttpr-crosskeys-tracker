const portals = [
  {a: 'lw-main', b: 'dw-village', requirement: 'mearl-hammer-glove'},
  {a: 'lw-main', b: 'dw-village', requirement: 'mearl-mitts'},
  {a: 'lw-main', b: 'swamp-palace', requirement: 'mearl-hammer-glove'},
  {a: 'lw-main', b: 'pyramid', requirement: 'defeat-aga1'},
  {a: 'lw-main', b: 'pyramid', requirement: 'mearl-hammer-glove'},
  {a: 'luck-fairy-island', b: 'ice-palace', requirement: 'mitts'},

  {a: 'dm-south-west', b: 'ddm-west', requirement: 'glove'},
  {a: 'dm-south-east', b: 'ddm-east', requirement: 'mitts'},
  {a: 'dm-north-east', b: 'ddm-top', requirement: 'hammer-mitts'},
];

const mirrors = [
  {a: 'dw-village', b: 'graveyard-ledge', requirement: 'mearl-mirror'},
  {a: 'dw-village', b: 'kings-tomb', requirement: 'mearl-mirror'},
  {a: 'bumper-cave-bottom', b: 'ascension-entrance', requirement: 'mirror'},
  {a: 'bumper-cave-top', b: 'return-cave-exit', requirement: 'mirror'},
  {a: 'hammer-pegs', b: 'magic-bat', requirement: 'mirror'},
  {a: 'swamp-palace', b: 'bombos-ledge', requirement: 'mirror'},
  {a: 'swamp-palace', b: 'race-game', requirement: 'mirror'},
  {a: 'swamp-palace', b: 'cave-45', requirement: 'mirror'},
  {a: 'pyramid', b: 'hyrule-balcony', requirement: 'mirror'},
  {a: 'catfish', b: 'zora', requirement: 'mirror'},

  {a: 'ddm-west', b: 'spec-rock-ledge', requirement: 'mirror'},
  {a: 'ddm-west', b: 'dm-south-west', requirement: 'mirror'},
  {a: 'ddm-top', b: 'dm-north-west', requirement: 'mirror'},
  {a: 'ddm-top', b: 'dm-north-east', requirement: 'mirror'},
  {a: 'tr-connector-ledge', b: 'mimic-cave-ledge', requirement: 'mirror'},
  {a: 'tr-connector-ledge', b: 'spiral-cave-top-ledge', requirement: 'mirror'},
  {a: 'tr-back', b: 'dm-fairy-top-ledge', requirement: 'mirror'},
  {a: 'ddm-floating-island', b: 'floating-island', requirement: 'mirror'},

  {a: 'mire', b: 'checkerboard-ledge', requirement: 'mirror'},
  {a: 'mire', b: 'desert-west-ledge', requirement: 'mirror'},
  {a: 'mire', b: 'desert-back', requirement: 'mirror'},
  {a: 'mire', b: 'desert-main', requirement: 'mirror'},
];

const regularEdges = [
  // light world
  {a: 'lw-main', b: 'ascension-entrance', requirement: 'glove'},
  {a: 'lw-main', b: 'kings-tomb', requirement: 'mitts'},
  {a: 'lw-main', b: 'magic-bat', requirement: 'hammer'},
  {a: 'lw-main', b: 'desert-main', requirement: 'book'},
  {a: 'lw-main', b: 'lake-hylia', requirement: 'flippers'},
  {a: 'lw-main', b: 'zora', requirement: 'glove'},

  {a: 'ascension-entrance', b: 'lw-main'},
  
  {a: 'kings-tomb', b: 'lw-main', requirement: 'mitts'},

  {a: 'lake-hylia', b: 'lw-main', requirement: 'flippers'},
  {a: 'lake-hylia', b: 'zora', requirement: 'flippers'},
  {a: 'lake-hylia', b: 'luck-fairy-island'},
  {a: 'lake-hylia', b: 'waterfall-fairy-ledge'},

  {a: 'zora', b: 'lw-main', requirement: 'glove'},
  {a: 'zora', b: 'lake-hylia', requirement: 'flippers'},
  {a: 'zora', b: 'zora-ledge', requirement: 'flippers'},

  {a: 'luck-fairy-island', b: 'lake-hylia', requirement: 'flippers'},

  {a: 'waterfall-fairy-ledge', b: 'lake-hylia', requirement: 'flippers'},

  {a: 'zora-ledge', b: 'zora', requirement: 'flippers'},

  {a: 'desert-west-ledge', b: 'lw-main'},
  {a: 'desert-west-ledge', b: 'desert-back', requirement: 'glove'},
  {a: 'desert-back', b: 'desert-west-ledge', requirement: 'glove'},

  // death mountain
  {a: 'dm-north-west', b: 'dm-south-west'},
  {a: 'dm-north-west', b: 'dm-north-east', requirement: 'hammer'},

  {a: 'dm-south-west', b: 'dm-south-east', requirement: 'hookshot'},

  {a: 'spec-rock-ledge', b: 'dm-north-west'},
  {a: 'spec-rock-ledge', b: 'dm-south-west'},

  {a: 'dm-north-east', b: 'dm-north-west', requirement: 'hammer'},
  {a: 'dm-north-east', b: 'dm-south-east'},
  {a: 'dm-north-east', b: 'spiral-cave-top-ledge'},
  {a: 'dm-north-east', b: 'dm-fairy-top-ledge'},

  {a: 'dm-south-east', b: 'dm-south-west', requirement: 'hookshot'},
  {a: 'dm-south-east', b: 'dm-fairy-bottom-ledge', requirement: 'mitts'},

  {a: 'dm-fairy-top-ledge', b: 'dm-fairy-bottom-ledge'},

  {a: 'dm-fairy-bottom-ledge', b: 'dm-south-east'},

  {a: 'spiral-cave-top-ledge', b: 'dm-south-east'},

  // dark world
  {a: 'dw-village', b: 'dw-village-shop', requirement: 'mearl-hammer'},
  {a: 'dw-village', b: 'bumper-cave-bottom', requirement: 'mearl-glove'},
  {a: 'dw-village', b: 'hammer-pegs', requirement: 'mearl-mitts'},
  {a: 'dw-village', b: 'swamp-palace'},
  {a: 'dw-village', b: 'dark-potion-shop', requirement: 'mearl-flippers'},

  {a: 'dw-village-shop', b: 'dw-village', requirement: 'mearl-hammer'},

  {a: 'bumper-cave-bottom', b: 'dw-village'},
  {a: 'bumper-cave-top', b: 'dw-village'},

  {a: 'hammer-pegs', b: 'dw-village', requirement: 'mearl-mitts'},

  {a: 'swamp-palace', b: 'dw-village', requirement: 'mearl-mitts'},
  {a: 'swamp-palace', b: 'stumpy', requirement: 'mearl'},
  {a: 'swamp-palace', b: 'dark-shopping-mall', requirement: 'mearl-flippers'},
  {a: 'swamp-palace', b: 'pyramid', requirement: 'mearl-hammer'},

  {a: 'dark-potion-shop', b: 'dw-village', requirement: 'mearl-hookshot'},
  {a: 'dark-potion-shop', b: 'pyramid', requirement: 'mearl-glove'},
  {a: 'dark-potion-shop', b: 'pyramid', requirement: 'mearl-hammer'},
  {a: 'dark-potion-shop', b: 'catfish', requirement: 'mearl-glove'},

  {a: 'stumpy', b: 'swamp-palace', requirement: 'mearl'},

  {a: 'dark-shopping-mall', b: 'pyramid', requirement: 'mearl-flippers'},

  {a: 'pyramid', b: 'swamp-palace', requirement: 'mearl-hammer'},
  {a: 'pyramid', b: 'dark-potion-shop', requirement: 'mearl-flippers'},
  {a: 'pyramid', b: 'dark-potion-shop', requirement: 'mearl-glove'},
  {a: 'pyramid', b: 'dark-potion-shop', requirement: 'mearl-hammer'},
  {a: 'pyramid', b: 'dark-shopping-mall', requirement: 'mearl-flippers'},

  {a: 'catfish', b: 'dark-potion-shop', requirement: 'mearl-glove'},

  // dark death mountain
  {a: 'ddm-top', b: 'ddm-east'},
  {a: 'ddm-top', b: 'ddm-west'},
  {a: 'ddm-floating-island', b: 'ddm-top'},
];  

const edges = regularEdges.concat(mirrors).concat(portals);
