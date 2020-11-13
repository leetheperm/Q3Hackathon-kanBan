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
  padding: 10px;
  background-color: #2C8C99;
  color: white;
  border-radius: 10px;
  transition: background-color 0.25s ease-out;
  text-align: center;
  font-size: 150%;
  font-family:helvetica;
  width:30%;
  margin: 30px auto;

  &:hover {
    background-color: #B3D0D0;
    cursor:pointer;
  }

  & + & {
    margin-top: 4px;
  }
`;

const Header = styled.h1`
  color:#42D9C8;
  font-family:helvetica;
  text-align: center;
  margin-top: 45px;
  font-size: 40px;
`;
const Header3 = styled.h3`
  color: white;
  font-size: 23px;
  font-family:helvetica;
  text-align: center;
  margin-top: 50px;
`;

const StyledAlert = styled(Alert)`
  background-color: #EFF7FF;
  font-family:helvetica;
  color: #231123;
  width: 30%;
  margin: 0 auto;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  margin-bottom: 35px;
`;
