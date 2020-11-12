import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Alert } from "react-bootstrap";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import { dayCards } from "../data/dayCards";

import { Board } from "./boardComponents/Board";
import { RulesPage } from "./RulesPage";
import { WorkerBoard } from "./workers/WorkerBoard";

export const MainPage: FC = () => {
  const [dayNumber, setDayNumber] = useState(8);
  const [showDayCard, setShowDayCard] = useState(false);
  const [dayCardText, setDayCardText] = useState<String>("");

  const closeDayCard = () => setShowDayCard(false);

  useEffect(() => {
    if (dayNumber > 8) {
      setDayCardText(dayCards[dayNumber]);
      setShowDayCard(true);
    }
  }, [dayNumber]);

  return (
    <>
      <Header>Kanban Boardgame Digital Edition</Header>
      <Header3>{"Day: " + dayNumber}</Header3>
      <StyledCollapsible trigger="Rules">
        <RulesPage />
      </StyledCollapsible>
      <StyledCollapsible trigger="Employees">
        <WorkerBoard
          dayNumber={dayNumber}
          incrementDay={() => {
            setDayNumber(dayNumber + 1);
          }}
        />
      </StyledCollapsible>
      {showDayCard && (
        <StyledAlert dismissible onClose={closeDayCard}>
          <Alert.Heading>{"Day " + dayNumber}</Alert.Heading>
          <p>{dayCardText}</p>
        </StyledAlert>
      )}
      <StyledCollapsible trigger="Story Board">
        <Board dayNumber={dayNumber} />
      </StyledCollapsible>
    </>
  );
};

const StyledCollapsible = styled(Collapsible)`
  padding: 5px;
  background-color: #2D3E63;
  color: white;
  border-radius: 4px;
  transition: background-color 0.25s ease-out;
  margin: 10px;
  text-align: center;
  font-size: 150%;
  width:30%;
  margin: 0 auto;

  &:hover {
    background-color: #3F76BF;
  }

  & + & {
    margin-top: 4px;
  }
`;

const Header = styled.h1`
  color:#3F76BF;
  font-family:helvetica;
  text-decoration: underline;
  text-align: center;
`;
const Header3 = styled.h3`
  color: white;
  font-size: 175%;
  font-family:helvetica;
  text-align: center;
`;

const StyledAlert = styled(Alert)`
  background-color: white;
  font-family:helvetica;
  color: black;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
`;
