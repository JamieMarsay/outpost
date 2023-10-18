import React, { useContext } from "react";
import { GameContext } from "@/context/Game/GameProvider";
import { Icon } from "../Icon/Icon";

const Header = () => {
  const { day, population, food, gold, ore } = useContext(GameContext);
  return (
    <div className="p-2 flex justify-center border-b border-b-2 border-black">
      <div className="flex items-center mr-2 text-xl">
        <Icon name="access_alarm" className="mr-1 mb-1" />
        <p>{day}</p>
      </div>
      <div className="flex items-center mr-2 text-xl">
        <Icon name="groups" className="mr-1 mb-[-1]" />
        <p>{population}</p>
      </div>
      <div className="flex items-center mr-2 text-xl">
        <Icon name="grass" className="mr-1 mb-[-1]" />
        <p>{food}</p>
      </div>
      <div className="flex items-center mr-2 text-xl">
        <Icon name="join_inner" className="mr-1 mb-[-1]" />
        <p>{gold}</p>
      </div>
      <div className="flex items-center mr-2 text-xl">
        <Icon name="terrain" className="mr-1 mb-[-1]" />
        <p>{ore}</p>
      </div>
    </div>
  );
};

export default Header;
