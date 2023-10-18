import React, { useState, useEffect, useContext } from "react";
import Tile from "../Tile/Tile";
import { GameContext } from "../../context/Game/GameProvider";

const GameGrid = () => {
  const { endDay, generateTiles, mapTiles, claimPlayerTile } =
    useContext(GameContext);

  return (
    <div className="flex flex-wrap w-[509px]">
      {mapTiles.map((tile) => (
        <Tile
          onClick={() => {
            claimPlayerTile(tile);
          }}
          key={`${tile.x}-${tile.y}`}
          config={tile}
        />
      ))}
      <button onClick={() => generateTiles()}>Re-roll</button>
      <button onClick={() => endDay()}>End day</button>
    </div>
  );
};

export default GameGrid;
