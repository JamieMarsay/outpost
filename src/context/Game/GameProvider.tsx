import { createContext, useState, useEffect, use } from "react";
import { useTileMap } from "../../utils/tileMap";

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const { generateTiles, mapTiles } = useTileMap();
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

  return (
    <GameContext.Provider
      value={{
        mapTiles,
        generateTiles,
        // modifyTile,
        // checkIfNextToPlayerOwnedTile,
        ...gameState,
        setGameState,
        endDay,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
