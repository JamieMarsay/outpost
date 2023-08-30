import { createContext, useState, useEffect } from "react";

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [mapTiles, setMapTiles] = useState([]);
  const [playerTiles, setPlayerTiles] = useState([]);
  const [gameState, setGameState] = useState({
    day: 0,
    population: 2,
    food: 0,
    gold: 0,
    ore: 0,
  });

  // Game state
  const endDay = () => {
    setGameState((prev) => ({ ...prev, day: (prev.day += 1) }));

    // Add resources from player owned tiles
    playerTiles.forEach((tile) => {
      if (tile.resource) {
        setGameState((prev) => ({
          ...prev,
          [tile.resource.type]: (prev[tile.resource.type] +=
            tile.resource.output),
        }));
      }
    });
  };

  // Resources
  const resources = [
    {
      type: "food",
      icon: "grass",
      output: 1,
    },
    {
      type: "ore",
      icon: "terrain",
      output: 1,
    },
    {
      type: "gold",
      icon: "join_inner",
      output: 1,
    },
  ];

  const randomResourceGenerator = () => {
    const randomResource = Math.floor(Math.random() * 50);
    return resources[randomResource] || false;
  };

  // Tiles
  const tileCount = 13;

  // #1 Generate a grid of x and y coordinates
  const grid = {
    x: [...Array(tileCount).keys()],
    y: [...Array(tileCount).keys()],
  };

  // #2 Generate a tile for each coordinate with tile config
  const generateTiles = () => {
    const startingX = Math.floor(Math.random() * tileCount);
    const startingY = Math.floor(Math.random() * tileCount);
    const tiles = [];

    // Clear the map for re-rolling
    setMapTiles([]);
    setPlayerTiles([]);

    // Generate tiles for each coordinate
    grid.y.map((y) =>
      grid.x.map((x) =>
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

    // Store generated map tiles in state
    setMapTiles(tiles);

    // Store all player owned tiles in states
    setPlayerTiles(tiles.filter((tile) => tile.isPlayerOwned));

    // Set initial outpost tile with resource
    const randomPlayerTile = tiles.find(
      (tile) => tile.isPlayerOwned && !tile.isPlayerOutpost
    );
    modifyTile(
      randomPlayerTile.x,
      randomPlayerTile.y,
      "resource",
      resources[0],
      tiles
    );
  };

  // #3 we set the initial tles that belong to the player
  const generateOutpost = (x, y, startingX, startingY) => {
    if (y == startingY || y == startingY - 1 || y == startingY + 1) {
      if (x == startingX - 1 || x == startingX + 1 || x == startingX) {
        return true;
      }
    }

    return false;
  };

  const checkIfNextToPlayerOwnedTile = (x, y, tiles) => {
    const tileIndex = tiles.findIndex((tile) => tile.id == `${x}-${y}`);

    if (
      tiles[tileIndex - 1] ||
      tiles[tileIndex + 1] ||
      tiles[tileIndex + tileCount] ||
      tiles[tileIndex - tileCount] ||
      tiles[tileIndex + tileCount + 1] ||
      tiles[tileIndex + tileCount - 1] ||
      tiles[tileIndex - tileCount + 1] ||
      tiles[tileIndex - tileCount - 1]
    ) {
      return true;
    } else {
      return false;
    }
  };

  const modifyTile = (x, y, property, value, tiles) => {
    const tilesCopy = [...tiles];
    const tileIndex = tilesCopy.findIndex((tile) => tile.id == `${x}-${y}`);
    tilesCopy[tileIndex][property] = value;
    setMapTiles(tilesCopy);
  };

  useEffect(() => {
    generateTiles();
  }, []);

  return (
    <GameContext.Provider
      value={{
        mapTiles,
        generateTiles,
        modifyTile,
        checkIfNextToPlayerOwnedTile,
        ...gameState,
        setGameState,
        endDay,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
