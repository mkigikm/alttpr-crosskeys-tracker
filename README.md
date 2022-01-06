# Tracker for ALTTPR Crosskeys Mode

## Basic Usage

Track items by clicking on them. If you see an item at a location but can't grab it, you can mark it on the map by right clicking on the item and clicking on the location. Right clicking on locations also lets you track keys, shops, etc. You can add a dungeon to the map by right clicking on the dungeon name and clicking on the location.

Connectors, dropdowns, and locations of interest like the Bomb Shop can be tracked by clicking on the icons between the map and inventory, then clicking on the map. Scroll over the icons for what they represent. Most should be self explanatory, but some (like Spec Rock) aren't obvious. Connectors that have been tracked on both ends will have a line drawn between them. If the other end(s) haven't been tracked, the connector will be circled. If the connector goes to the other world, it will draw a line to the location with an unfilled circle are the other end.

The door icon lets you track locations with items. Click on the name to bring it to the column on the right. You can search for a name to filter the list. The CV name at the top of the dungeon list tracks how many chest are left in outstanding locations. Places like Mimic Cave will automatically move to the found column when the icon is placed on the map.

Dungeon info can be tracked by click on the columns to the left of the name. The first is the dungeon prize, the second is small keys, the third the big key, and the fourth the number of items. Right clicking will move in the opposite direction. Torch items in Desert Palace and Ganon's Tower can be marked by right clicking on the item and clicking on the dungeon name. This will put a DP or GT by the item in the inventory grid.

The medallions for Misery Mire and Turtle Rock can be tracked by right click on the square above the entrances.

To switch between the light and dark world maps, click on the portal in the lower left of the map (desert and mire area).

There is a timer at the bottom that can be started and paused by clicking on it.

## Logical Access

Entrances you can logically reach will have a green border. Unreachable ones will have a red border. A green border does not mean you can do what is placed at the location. Spike Cave will be green whether you have the required items or not.

## Autotracking

Autotracking works with QUsb2Snes. Start it by clicking on the box beside the Moon Pearl with the autotracking text it in. This will open a text input for the URL of the QUsb2Snes server. Autotracking supports all inventory items and locations. Dark caves will not automatically track unless you have the lamp, but will be marked as dark caves.

## Known Issues

The logic for the Skull Woods area is simplified. If you find a connector to the back of Skull Woods it will mark the whole western dark world as accessible, but this may not be true depending on the Skull Woods layout.

Report any issues by opening an issue in the Github project.