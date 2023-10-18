import { IResource, randomResourceGenerator } from "./resources";
import { useState } from "react";

interface ITile {
  id: string;
  x: number;
  y: number;
  isPlayerOwned: boolean;
  isPlayerOutpost: boolean;
  resource: IResource | null;
}

type EditableTileProperties = "isPlayerOwned";

export const useTileMap = () => {
  const [mapTiles, setMapTiles] = useState<ITile[]>([]);
  const [playerTiles, setPlayerTiles] = useState<ITile[]>([]);
  const tileCount = 13;

  // Generate a grid of x and y coordinates
  const grid = {
    x: [...Array(tileCount).keys()],
    y: [...Array(tileCount).keys()],
  };

  // Change the properties of a given tile
  const modifyTile = (tile: ITile, property: EditableTileProperties, value: string | number | boolean) => {
    const { x, y } = tile;
    const tilesCopy = [...mapTiles];
    const tileIndex = mapTiles.findIndex((tile) => tile.id == `${x}-${y}`);
    tilesCopy[tileIndex][property] = value;
    setMapTiles(tilesCopy);
  };

  // Checks if a given tile is next to a player owned tile
  const checkIfNextToPlayerOwnedTile = (x: number, y: number) => {
    const tileIndex = mapTiles.findIndex((tile) => tile.id == `${x}-${y}`);
  
    if (
      mapTiles[tileIndex - 1].isPlayerOwned ||
      mapTiles[tileIndex + 1].isPlayerOwned ||
      mapTiles[tileIndex + tileCount].isPlayerOwned ||
      mapTiles[tileIndex - tileCount].isPlayerOwned ||
      mapTiles[tileIndex + tileCount + 1].isPlayerOwned ||
      mapTiles[tileIndex + tileCount - 1].isPlayerOwned ||
      mapTiles[tileIndex - tileCount + 1].isPlayerOwned ||
      mapTiles[tileIndex - tileCount - 1].isPlayerOwned
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Claims a tile for the player after checking if it is next to a player owned tile
  const claimPlayerTile = (tile: ITile) => {
    const { x, y } = tile;

    if(checkIfNextToPlayerOwnedTile(x, y)) {
      modifyTile(tile, "isPlayerOwned", true);
    }
  };

  // Generates a 3x3 outpost drawn from the top left most tile starting at startingX, startingY
  const setStartingTiles = (x: number, y: number, startingX: number, startingY: number) => {
    if (y == startingY || y == startingY + 1 || y == startingY + 2) {
      if (x == startingX + 1 || x == startingX + 2 || x == startingX) {
        return true;
      }
    }

    return false;
  };

  // Generate a tile for each coordinate on the grid with tile config & load into state
  const generateTiles = () => {
    // Set an offset to prevent starting outpost from flowing over edge of grid.
    const tileOffset = 2;
    const startingX = Math.floor(Math.random() * (tileCount - tileOffset));
    const startingY = Math.floor(Math.random() * (tileCount - tileOffset));
    const tiles: ITile[] = [];

    // Reset state to prevent duplicate tiles on re-roll
    setMapTiles([]);
    setPlayerTiles([]);

    // Generate tiles for each coordinate
    grid.y.forEach((y) =>
      grid.x.forEach((x) => {
        const tileIsPlayerOwned = setStartingTiles(x, y, startingX, startingY);
        const tileIsPlayerOutpost = x == startingX + 1 && y == startingY + 1;

        tiles.push({
          id: `${x}-${y}`, 
          x,
          y,
          isPlayerOwned: tileIsPlayerOwned || tileIsPlayerOutpost,
          isPlayerOutpost: tileIsPlayerOutpost,
          resource: tileIsPlayerOwned ? randomResourceGenerator(5) : randomResourceGenerator(),
        })
      })
    );

    setMapTiles(tiles);
    setPlayerTiles(tiles.filter((tile) => tile.isPlayerOwned));
  };

  return {
    mapTiles,
    playerTiles,
    generateTiles,
    claimPlayerTile
  }
}

