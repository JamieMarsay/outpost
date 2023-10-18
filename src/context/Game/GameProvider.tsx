import { createContext, useState, useEffect, ReactNode } from "react";
import { useTileMap } from "../../utils/tileMap";

interface IGameProvider {
  children: ReactNode;
}

export const GameContext = createContext({});

export const GameProvider = ({ children }: IGameProvider) => {
  const { generateTiles, mapTiles, playerTiles, modifyTile, claimPlayerTile } =
    useTileMap();
  const [gameState, setGameState] = useState({
    day: 1,
    population: 2,
    food: 0,
    gold: 0,
    ore: 0,
  });

  // Game state
  const endDay = () => {
    setGameState((prev) => ({ ...prev, day: (prev.day += 1) }));

    // Add resources from player owned tiles
    // Outposts always give at least +1 food
    playerTiles.forEach((tile) => {
      // if (tile.isPlayerOutpost) {
      //   setGameState((prev) => ({
      //     ...prev,
      //     food: (prev.food += 1),
      //   }));
      // }

      if (tile.resource) {
        setGameState((prev) => ({
          ...prev,
          [tile.resource.type]: (prev[tile.resource.type] +=
            tile.resource.output),
        }));
      }
    });
  };

  useEffect(() => {
    generateTiles();
  }, []);

  console.log(gameState);

  return (
    <GameContext.Provider
      value={{
        mapTiles,
        generateTiles,
        modifyTile,
        // checkIfNextToPlayerOwnedTile,
        ...gameState,
        setGameState,
        claimPlayerTile,
        endDay,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
