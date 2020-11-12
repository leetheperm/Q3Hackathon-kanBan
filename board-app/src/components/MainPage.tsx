import React, { useState } from "react";
import { FC } from "react";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import { Board } from "./boardComponents/Board";
import { WorkerBoard } from "./workers/WorkerBoard";

export const MainPage: FC = () => {
  const [dayNumber, setDayNumber] = useState(9);

  return (
    <>
      <Header>Kanban Boardgame Digital Edition</Header>
      <Header3>{"Day: " + dayNumber}</Header3>
      <StyledCollapsible trigger="Employees">
        <WorkerBoard
          incrementDay={() => {
            setDayNumber(dayNumber + 1);
          }}
        />
      </StyledCollapsible>
      <StyledCollapsible trigger="Story Board">
        <Board />
      </StyledCollapsible>
    </>
  );
};

const StyledCollapsible = styled(Collapsible)`
  padding: 3px;
  background-color: orange;
  color: white;
  border-radius: 4px;
  transition: background-color 0.25s ease-out;
  margin: 10px;
  text-align: center;
  font-size: 150%;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`;

const Header = styled.h1`
  color: white;
  text-decoration: underline;
`;
const Header3 = styled.h3`
  color: white;
  font-size: 175%;
  text-align: center;
`;
