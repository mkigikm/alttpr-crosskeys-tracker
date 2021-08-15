const lwLocations = [
  {
    area: 'lw-main',
    name: 'Pedestal',
    requirement: 'pendants',
    type: 'item',
    x: 30,
    y: 30,
  },
  {
    area: 'lw-main',
    name: 'Mushroom',
    type: 'item',
    x: 120,
    y: 90,
  },
  {
    area: 'lw-main',
    name: 'Lost Woods Casino',
    x: 180,
    y: 10,
  },
  {
    area: 'lw-main',
    name: 'Lumberjack Hut',
    x: 300,
    y: 70,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Lumberjack Drop',
    poiName: 'lumberjack-drop',
    requirement: 'boots-aga1',
    type: 'drop',
    x: 320,
    y: 20,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Hideout',
    poiName: 'hideout',
    type: 'drop',
    x: 160,
    y: 150,
  },
  {
    area: 'ascension-entrance',
    hidden: true,
    name: 'Ascension Entrance',
    poiName: 'climb-bottom',
    x: 320,
    y: 170,
  },
  {
    area: 'return-cave-exit',
    name: 'Return Cave Exit',
    x: 310,
    y: 120,
  },
  {
    area: 'lw-main',
    name: 'Kakariko Fortune Teller',
    x: 160,
    y: 290,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Bonk Rocks',
    requirement: 'boots',
    x: 380,
    y: 280,
  },
  {
    area: 'lw-main',
    name: 'Sanctuary',
    poiName: 'sanctuary',
    requirement: 'glove',
    type: 'drop',
    x: 440,
    y: 260,
  },
  {
    area: 'graveyard-ledge',
    itemCount: 1,
    name: 'Graveyard Ledge',
    x: 550,
    y: 270,
  },
  {
    area: 'kings-tomb',
    itemCount: 1,
    name: 'King\'s Tomb',
    requirement: 'boots',
    x: 600,
    y: 290,
  },
  {
    area: 'lw-main',
    name: 'Fairy Drop',
    type: 'drop',
    x: 650,
    y: 270,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Potion Shop',
    poiName: 'potion-shop',
    x: 780,
    y: 320,
  },
  {
    area: 'lw-main',
    itemCount: 5,
    name: 'Well',
    poiName: 'well',
    type: 'drop',
    x: 10,
    y: 380,
  },
  {
    area: 'lw-main',
    itemCount: 5,
    kakariko: true,
    name: 'Blind\'s Hut',
    x: 90,
    y: 380,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Elder Left',
    x: 150,
    y: 380,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Elder Right',
    x: 210,
    y: 380,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Angry Left',
    x: 40,
    y: 430,
  },
  {
    area: 'lw-main',
    name: 'Bottle Vendor',
    type: 'item',
    x: 90,
    y: 430,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Angry Right',
    x: 210,
    y: 430,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    kakariko: true,
    name: 'Chicken Hut',
    x: 90,
    y: 480,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    kakariko: true,
    name: 'Sick Kid',
    poiName: 'sick-kid',
    x: 150,
    y: 480,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Bush House',
    x: 210,
    y: 480,
  },
  {
    area: 'lw-main',
    name: 'Tavern Item',
    type: 'item',
    x: 150,
    y: 530,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Tavern',
    x: 150,
    y: 580,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Kakariko Shop',
    x: 90,
    y: 550,
  },
  {
    area: 'lw-main',
    kakariko: true,
    name: 'Bombable Hut',
    x: 20,
    y: 570,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Smiths',
    poiName: 'smith',
    x: 290,
    y: 500,
  },
  {
    area: 'magic-bat',
    itemCount: 1,
    name: 'Magic Bat',
    poiName: 'magic-bat',
    type: 'drop',
    x: 320,
    y: 550,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Library',
    poiName: 'library',
    x: 155,
    y: 650,
  },
  {
    area: 'lw-main',
    name: 'Kakariko Casino',
    x: 200,
    y: 690,
  },
  {
    area: 'lw-main',
    name: 'Brother\'s Right',
    x: 150,
    y: 700,
  },
  {
    area: 'race-game',
    name: 'Brother\'s Left',
    x: 100,
    y: 700,
  },
  {
    area: 'race-game',
    name: 'Race Game',
    type: 'item',
    x: 20,
    y: 700,
  },
  {
    area: 'cave-45',
    itemCount: 1,
    name: 'Cave 45',
    x: 270,
    y: 820,
  },
  {
    area: 'lw-main',
    name: 'Dig Spot',
    requirement: 'shovel',
    type: 'item',
    x: 290,
    y: 650,
  },
  {
    area: 'lw-main',
    name: 'Hyrule Castle Main',
    poiName: 'hyrule-main',
    x: 480,
    y: 450,
  },
  {
    area: 'hyrule-balcony',
    hidden: true,
    name: 'Hyrule Castle West',
    poiName: 'hyrule-west',
    x: 430,
    y: 380,
  },
  {
    area: 'hyrule-balcony',
    hidden: true,
    name: 'Hyrule Castle East',
    poiName: 'hyrule-east',
    x: 530,
    y: 380,
  },
  {
    area: 'hyrule-balcony',
    name: 'Castle Tower',
    poiName: 'CT',
    requirement: 'barrier',
    x: 480,
    y: 390,
  },
  {
    area: 'lw-main',
    itemCount: 2,
    name: 'Secret Passage',
    poiName: 'uncle',
    type: 'drop',
    x: 580,
    y: 420,
  },
  {
    area: 'lw-main',
    name: 'Link Bonk Rocks',
    requirement: 'boots',
    x: 470,
    y: 650,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Link\'s House',
    x: 530,
    y: 670,
  },
  {
    area: 'lw-main',
    name: 'Lightworld Hype Cave',
    x: 580,
    y: 760,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Dam',
    poiName: 'dam',
    x: 450,
    y: 920,
  },
  {
    area: 'lw-main',
    name: 'Dam Item',
    requirement: 'dam',
    type: 'item',
    x: 400,
    y: 870,
  },
  {
    area: 'lw-main',
    itemCount: 5,
    name: 'Mini Moldorm',
    x: 630,
    y: 930,
  },
  {
    area: 'lw-main',
    name: '50 Rupee Cave',
    requirement: 'glove',
    x: 290,
    y: 940,
  },
  {
    area: 'lw-main',
    name: 'Desert Fairy',
    x: 270,
    y: 890,
  },
  {
    area: 'bombos-ledge',
    name: 'Bombos Tablet',
    requirement: 'sword+-book',
    type: 'item',
    x: 200,
    y: 910,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Agina',
    x: 190,
    y: 810,
  },
  {
    area: 'checkerboard-ledge',
    itemCount: 1,
    name: 'Checkerboard',
    requirement: 'glove',
    x: 180,
    y: 760,
  },
  {
    area: 'desert-main',
    name: 'Desert Palace Main',
    poiName: 'desert-main',
    x: 65,
    y: 820,
  },
  {
    area: 'desert-west-ledge',
    hidden: true,
    name: 'Desert Palace West',
    poiName: 'desert-west',
    x: 10,
    y: 780,
  },
  {
    area: 'desert-east-ledge',
    hidden: true,
    name: 'Desert Palace East',
    poiName: 'desert-east',
    x: 120,
    y: 780,
  },
  {
    area: 'desert-back',
    name: 'Desert Palace Back',
    poiName: 'desert-back',
    x: 65,
    y: 760,
  },
  {
    area: 'desert-west-ledge',
    name: 'Desert Ledge',
    type: 'item',
    x: 10,
    y: 900,
  },
  {
    area: 'lw-main',
    name: 'Hylia Lake Fortune Teller',
    x: 630,
    y: 800,
  },
  {
    area: 'hylia-island',
    name: 'Hylia Lake Island',
    type: 'item',
    x: 700,
    y: 820,
  },
  {
    area: 'lw-main',
    name: 'Hylia Lake Shop',
    x: 710,
    y: 740,
  },
  {
    area: 'luck-fairy-island',
    name: 'Luck Fairy',
    x: 770,
    y: 840,
  },
  {
    area: 'lake-hylia',
    name: 'Hobo',
    type: 'item',
    x: 690,
    y: 680,
  },
  {
    area: 'lw-main',
    itemCount: 1,
    name: 'Ice Rod Cave',
    x: 880,
    y: 780,
  },
  {
    area: 'lw-main',
    name: 'Good Bee',
    x: 940,
    y: 780,
  },
  {
    area: 'lw-main',
    name: '20 Rupee Cave',
    requirement: 'glove',
    type: '',
    x: 910,
    y: 830,
  },
  {
    area: 'lw-main',
    name: 'Eastern Fairy',
    x: 810,
    y: 640,
  },
  {
    area: 'lw-main',
    name: 'Eastern Portal',
    x: 950,
    y: 695,
  },
  {
    area: 'lw-main',
    itemCount: 4,
    name: 'Sahasrahla',
    poiName: 'saha',
    x: 790,
    y: 440,
  },
  {
    area: 'lw-main',
    name: 'Eastern Palace',
    poiName: 'EP',
    x: 940,
    y: 400,
  },
  {
    area: 'waterfall-fairy-ledge',
    itemCount: 2,
    name: 'Waterfall Fairy',
    x: 890,
    y: 200,
  },
  {
    area: 'zora-ledge',
    name: 'Zora Ledge',
    type: 'item',
    x: 950,
    y: 190,
  },
  {
    area: 'zora',
    name: 'King Zora',
    type: 'item',
    x: 930,
    y: 140,
  },
  {
    area: 'dm-north-west',
    name: 'Ether Tablet',
    requirement: 'sword+-book',
    type: 'item',
    x: 400,
    y: 10,
  },
  {
    area: 'dm-north-west',
    name: 'Tower of Hera',
    poiName: 'TH',
    x: 540,
    y: 10,
  },
  {
    area: 'spec-rock-ledge',
    name: 'Spectacle Rock Item',
    type: 'item',
    x: 470,
    y: 30,
  },
  {
    area: 'dm-south-west',
    name: 'Spectacle Rock Top',
    x: 490,
    y: 80,
  },
  {
    area: 'dm-south-west',
    name: 'Spectacle Rock Middle',
    x: 440,
    y: 110,
  },
  {
    area: 'dm-south-west',
    itemCount: 1,
    name: 'Spectacle Rock Bottom',
    poiName: 'spec-rock-underpass',
    x: 490,
    y: 130,
  },
  {
    area: 'dm-south-west',
    name: 'Return Cave Entrance',
    x: 380,
    y: 100,
  },
  {
    area: 'dm-south-west',
    name: 'Old Man East',
    x: 560,
    y: 170,
  },
  {
    area: 'dm-south-west',
    name: 'Old Man West',
    poiName: 'old-man-main',
    x: 460,
    y: 200,
  },
  {
    area: 'dm-south-west',
    name: 'Old Man Item',
    requirement: 'lamp',
    type: 'item',
    x: 410,
    y: 200,
  },
  {
    area: 'dm-south-west',
    hidden: true,
    name: 'Ascension Cave Exit',
    poiName: 'climb-top',
    x: 380,
    y: 150,
  },
  {
    area: 'floating-island',
    name: 'Floating Island',
    type: 'item',
    x: 720,
    y: 10,
  },
  {
    area: 'dm-north-east',
    name: 'Paradox Cave Top',
    hidden: true,
    poiName: 'paradox-exit',
    x: 840,
    y: 20,
  },
  {
    area: 'dm-south-east',
    itemCount: 7,
    name: 'Paradox Cave Middle',
    poiName: 'paradox-5items',
    x: 860,
    y: 150,
  },
  {
    area: 'dm-south-east',
    hidden: true,
    name: 'Paradox Cave Bottom',
    poiName: 'paradox-2items',
    x: 830,
    y: 200,
  },
  {
    area: 'dm-south-east',
    name: 'Left of Paradox Cave',
    x: 800,
    y: 150,
  },
  {
    area: 'dm-fairy-bottom-ledge',
    name: 'East Death Mountain Fairy Bottom',
    x: 750,
    y: 150,
  },
  {
    area: 'dm-fairy-top-ledge',
    name: 'East Death Mountain Fairy Top',
    x: 750,
    y: 100,
  },
  {
    area: 'mimic-cave-ledge',
    itemCount: 1,
    name: 'Mimic Cave',
    poiName: 'mimic',
    x: 830,
    y: 80,
  },
  {
    area: 'spiral-cave-top-ledge',
    itemCount: 1,
    name: 'Spiral Cave Top',
    poiName: 'spiral-top',
    x: 670,
    y: 80,
  },
  {
    area: 'dm-south-east',
    name: 'Spiral Cave Bottom',
    x: 670,
    y: 150,
  },
];
