import React, { useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";

// Tiles can be owned by a player, be resources, or be empty
// 1. Tiles owned by the player will be green
// 2. Tiles not owned by players will be grey
// 3. Some tiles will be resources

interface ITileProps {
  onClick: () => void;
  config: any;
}

const Tile = ({ config, onClick }: ITileProps) => {
  const { x, y, isPlayerOutpost, isPlayerOwned, resource } = config;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div
        className={`hover:cursor-pointer hover:scale-125 transition-transform mr-1 mb-1 rounded-md w-[35px] h-[35px] flex justify-center items-center
          ${isPlayerOwned && !isPlayerOutpost ? "bg-green-600" : "bg-gray-600"}
        `}
        onClick={onClick}
      >
        {isPlayerOutpost && (
          <Icon
            className="text-white text-2xl"
            aria-label="Player city"
            name="hive"
          />
        )}

        {resource?.type && !isPlayerOutpost && (
          <Icon
            aria-label={`resource tile ${resource.name}`}
            className="text-white text-3xl"
            name={resource.icon}
          />
        )}
      </div>
    )
  );
};

export default Tile;
