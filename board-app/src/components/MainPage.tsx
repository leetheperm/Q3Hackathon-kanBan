import React from "react";
import { FC } from "react";
import { Board } from "./boardComponents/Board";
import { WorkerBoard } from "./workers/WorkerBoard";

export const MainPage: FC = () => {
  return (
    <>
      <WorkerBoard />
      <Board />
    </>
  );
};
