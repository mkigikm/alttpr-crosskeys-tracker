const WRAM_START = 0xF50000;
const SAVEDATA_START = WRAM_START + 0xF000 + 0x340;

const INVENTORY_OFFSETS = {
  bow: 0x340,
  hookshot: 0x342,
  firerod: 0x345,
  icerod: 0x346,
  bombos: 0x347,
  ether: 0x348,
  quake: 0x349,
  lamp: 0x34A,
  hammer: 0x34B,
  book: 0x34E,
  bottle: 0x34F,
  somaria: 0x350,
  byrna: 0x351,
  cape: 0x352,
  mirror: 0x353,
  glove: 0x354,
  boots: 0x355,
  flippers: 0x356,
  mearl: 0x357,
  sword: 0x359,
};

const BIG_KEY_OFFSETS = {
  GT: [0x366, 0x04],
  TR: [0x366, 0x08],
  TT: [0x366, 0x10],
  TH: [0x366, 0x20],
  IP: [0x366, 0x40],
  SW: [0x366, 0x80],
  MM: [0x367, 0x01],
  PD: [0x367, 0x02],
  SP: [0x367, 0x04],
  DP: [0x367, 0x10],
  EP: [0x367, 0x20],
};

const MAP_OFFSETS = {
  GT: [0x368, 0x04],
  TR: [0x368, 0x08],
  TT: [0x368, 0x10],
  TH: [0x368, 0x20],
  IP: [0x368, 0x40],
  SW: [0x368, 0x80],
  MM: [0x369, 0x01],
  PD: [0x369, 0x02],
  SP: [0x369, 0x04],
  DP: [0x369, 0x10],
  EP: [0x369, 0x20],
};

const KEY_OFFSETS = {
  DP: 0x4E3,
  CT: 0x4E4,
  SP: 0x4E5,
  PD: 0x4E6,
  MM: 0x4E7,
  SW: 0x4E8,
  IP: 0x4E9,
  TH: 0x4EA,
  TT: 0x4EB,
  TR: 0x4EC,
  GT: 0x4ED,
};

const t = (offset) => offset - INVENTORY_OFFSETS.bow;

const INVENTORY_TRACKING_OFFSET = 0x38C;
const INVENTORY_TRACKING_MASKS = {
  mushroom: 0x28,
  powder: 0x10,
  shovel: 0x04,
  flute: 0x03,
};

class Autotracker {
  constructor(game, controller) {
	  this.game = game;
    this.controller = controller;
  }

  connect() {
    console.log('attempting connection');
    if (this.socket) {
      console.log('socket is established so oh well', socket);
      return;
    }

    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.binaryType = 'arraybuffer';

    this.socket.onclose = (event) => {
      this.cleanup();
      console.log("Disconnected", event);
      this.reconnect();
    }

    this.socket.onerror = (event) => {
      this.cleanup();
      console.log("Error", event);
      this.reconnect();
    }
    
    this.socket.onopen = (event) => {
      this.connected(event);
    }
  }

  reconnect() {
    setTimeout(() => this.connect(), 5000);
  }

  cleanup() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.socket) {
      this.socket.onopen = () => {};
      this.socket.onclose = () => {};
      this.socket.onmessage = () => {};
      this.socket.onerror = () => {};
      this.socket.close();
      this.socket = null;
    }
  }

  connected(event) {
    this.socket.send(JSON.stringify({
      Opcode: 'DeviceList',
      Space: 'SNES',
    }));
    this.socket.onmessage = (event) => { this.deviceList(event) };
  }

  deviceList(event) {
    const results = JSON.parse(event.data).Results;
    if (results.length < 1 || !this.socket) {
      console.log('no devices');
      this.cleanup();
      this.reconnect();
    }
    this.deviceName = results[0];
    console.log('attaching to', this.deviceName);
    this.socket.send(JSON.stringify({
      Opcode: 'Attach',
      Space: 'SNES',
      Operands: [this.deviceName],
    }));
    this.loopCount = 0;
    this.loop();
  }

  loop() {
    this.timer = setTimeout(() => this.innerLoop(), 100);
  }

  innerLoop() {
    const count = this.loopCount++;
    const process = (event) => {
      this.track(new Uint8Array(event.data));
      this.loop();
    };
    if (this.loopCount % 2 === 0) {
      this.socket.send(JSON.stringify({
        Opcode: 'GetAddress',
        Space: 'SNES',
        Operands: [SAVEDATA_START.toString(16), '0x1AE'],
      }));
      this.socket.onmessage = process;
    } else {
      const p = (event) => {
        const d = new Uint8Array(event.data);
        const state = {
          module: d[0x10],
          dungeonId: d[0x10E] + (d[0x10F] << 8),
          indoors: d[0x1B],
          coords: [d[0x20] + (d[0x21] << 8), d[0x22] + (d[0x23] << 8)],
          overworldIndex: d[0x8A] + (d[0x8B] << 8),
          roomId: d[0xA0] + (d[0xA1] << 8),
        }
        const myText = `0x${state.module.toString(16).padStart(2, '0')} 0x${state.overworldIndex.toString(16).padStart(4, '0').toUpperCase()} 0x${state.coords[0].toString(16).padStart(4, '0').toUpperCase()}, 0x${state.coords[1].toString(16).padStart(4, '0').toUpperCase()} ${!!state.indoors} 0x${state.dungeonId.toString(16).padStart(4, '0').toUpperCase()} 0x${state.roomId.toString(16).padStart(4, '0').toUpperCase()}`;
        //console.log(myText);
        if (this.previousState &&
            this.previousState.module > 0x05 &&
            state.module > 0x05 &&
            this.game.hyruleMap.autotrack(state, this.previousState, this.game.inventory.objects.get('lamp').level > 0)
           ) {
          this.controller.render();
        }
        this.previousState = state;

        this.loop();
      };
      this.socket.send(JSON.stringify({
        Opcode: 'GetAddress',
        Space: 'SNES',
        Operands: [(WRAM_START).toString(16), '0x1AE'],
      }));
      this.socket.onmessage = p;
    }
  }

  track(data) {
    let updated = false;

    for (const item in INVENTORY_OFFSETS) {
      const itemLevel = data[t(INVENTORY_OFFSETS[item])];
      updated = this.game.inventory.autotrack(item, itemLevel) || updated;
    }

    for (const item in INVENTORY_TRACKING_MASKS) {
      const hasItem = data[t(INVENTORY_TRACKING_OFFSET)] & INVENTORY_TRACKING_MASKS[item];
      updated = this.game.inventory.autotrack(item, hasItem) || updated;
    }

    for (const dungeon in KEY_OFFSETS) {
      const keyCount = data[t(KEY_OFFSETS[dungeon])];
      updated = this.game.dungeons.autotrackKeys(dungeon, keyCount) || updated;
    }
    const hyruleCastleKeyCount = data[t(0x4E0)] + data[t(0x4E1)];
    updated = this.game.dungeons.autotrackKeys('HC', hyruleCastleKeyCount) || updated;

    for (const dungeon in BIG_KEY_OFFSETS) {
      const offset = t(BIG_KEY_OFFSETS[dungeon][0]);
      const mask = BIG_KEY_OFFSETS[dungeon][1];
      updated = this.game.dungeons.autotrackBigKey(dungeon, data[offset] & mask) || updated;
    }

    for (const dungeon in MAP_OFFSETS) {
      const offset = t(MAP_OFFSETS[dungeon][0]);
      const mask = MAP_OFFSETS[dungeon][1];
      updated = this.game.dungeons.autotrackMap(dungeon, data[offset] & mask) || updated;
    }

    updated && this.controller.render();
  }
}
