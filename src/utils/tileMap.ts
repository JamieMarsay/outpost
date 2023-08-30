import { resources, randomResourceGenerator } from "./resources";
import { useState, useEffect } from "react";

export const useTileMap = () => {
  const [mapTiles, setMapTiles] = useState([]);
  const [playerTiles, setPlayerTiles] = useState([]);
  const tileCount = 13;

  // Generate a grid of x and y coordinates
  const grid = {
    x: [...Array(tileCount).keys()],
    y: [...Array(tileCount).keys()],
  };

  // Generates a 3x3 outpost around the starting tile by setting tiles to owned by player
  const generateOutpost = (x: number, y: number, startingX: number, startingY: number) => {
    if (y == startingY || y == startingY - 1 || y == startingY + 1) {
      if (x == startingX - 1 || x == startingX + 1 || x == startingX) {
        return true;
      }
    }

    return false;
  };

  // Change the properties of a given tile
  const modifyTile = (x: number, y: number, property, value) => {
    console.log(mapTiles)
    const tilesCopy = [...mapTiles];
    const tileIndex = mapTiles.findIndex((tile) => tile.id == `${x}-${y}`);
    tilesCopy[tileIndex][property] = value;
    setMapTiles(tilesCopy);
  };

  // Checks if a given tile is next to a player owned tile
  const checkIfNextToPlayerOwnedTile = (x: number, y: number) => {
    const tileIndex = mapTiles.findIndex((tile) => tile.id == `${x}-${y}`);
  
    if (
      mapTiles[tileIndex - 1] ||
      mapTiles[tileIndex + 1] ||
      mapTiles[tileIndex + tileCount] ||
      mapTiles[tileIndex - tileCount] ||
      mapTiles[tileIndex + tileCount + 1] ||
      mapTiles[tileIndex + tileCount - 1] ||
      mapTiles[tileIndex - tileCount + 1] ||
      mapTiles[tileIndex - tileCount - 1]
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Generate a tile for each coordinate on the grid with tile config & load into state
  const generateTiles = () => {
    const startingX = Math.floor(Math.random() * tileCount);
    const startingY = Math.floor(Math.random() * tileCount);
    const tiles = [];

    // Reset state to prevent duplicate tiles 
    setMapTiles([]);
    setPlayerTiles([]);

    // Generate tiles for each coordinate
    grid.y.forEach((y) =>
      grid.x.forEach((x) =>
        tiles.push({
          id: `${x}-${y}`,
          x,
          y,
          isPlayerOwned: generateOutpost(x, y, startingX, startingY),
          isPlayerOutpost: x == startingX && y == startingY,
          resource: randomResourceGenerator(),
        })
      )
    );

    setMapTiles(tiles);
    setPlayerTiles(tiles.filter((tile) => tile.isPlayerOwned));

    // // Set initial outpost tile with resource
    // const randomPlayerTile = tiles.find(
    //   (tile) => tile.isPlayerOwned && !tile.isPlayerOutpost
    // );

    // modifyTile(
    //   randomPlayerTile.x,
    //   randomPlayerTile.y,
    //   "resource",
    //   resources[0],
    // );
  };

  useEffect(() => {
    generateTiles();
  }, []);

  return {
    mapTiles,
    playerTiles,
    generateTiles,
  }
}

