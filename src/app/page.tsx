"use client";
import React from "react";
import GameGrid from "../components/Grid/Grid";
// import Header from "../components/Header/Header";
import { GameProvider } from "../context/Game/GameProvider";

export default function Page() {
  return (
    <GameProvider>
      {/* <Header>test</Header> */}
      <div className="md:w-6/12 mx-auto flex flex-col items-center justify-center h-screen">
        <GameGrid />
      </div>
    </GameProvider>
  );
}
