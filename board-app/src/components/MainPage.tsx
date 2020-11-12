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
      <StyledCollapsible trigger="Rules">
        <h2>INTRODUCTION</h2>
        <p>The TrayPort Kanban game has been designed for employees to simulate a Kanban board with
          factors affecting decisions day by day. These factors can be external and internal and as a Team or
            Individual you must overcome these to try and make the most amount of money by delivering story
            cards to your customers.</p>
            <h2>HOW TO PLAY</h2> 
<p>•	Each story card has a number of subscribers (subs) you will gain by completing each card. Your business model runs of making money from subscribers, so more story cards completed – more money earned!</p>
<p>•	Each story has a numerical value of the amount of work needed competition for both; Design, Development and Testing.</p>
<p>•	You must complete each division of work before moving the story card on to the right of the board. </p>
<p>•  Billing is every three days from the 9th day of the cycle.</p>
<p>•	Each dice, per column, represents the number of workers for each department, for example if 3 dice were in development that represents 3 workers. </p>
<p>•	You will roll each column of dice once per day, starting with Testing, then Development and lastly Design – the aim of KanBan is pulling work to the right (competition) rather than pushing work in. </p>
<p>•	The sum of all the dice rolled per column per day is the total amount of work that will go into the cards within the column. </p>
<p>•	When the work is completed per card, the story may move to the next column to the right if the column has available WIP. </p>
<p>•	Each column has a WIP limit, you cannot exceed this number with the number of stories in the column. </p>
<p>•	You will see that to start with you will have 2 designers, 3 developers and 2 testers. If these workers are working within their specialised columns (i.e. developers are working in the development column) they will get double their value. So, if for development, you rolled 2+3+1 you would get a total number of 12 to spend within the dev column.</p>
<p>•	However, with this game, bottlenecks can be a problem and so you may wish to move workers around, for example, putting a designer in development. If you do this the designer would only get the face value of the dice and that specific dice would not get double as the designer does not specialise in development.</p>
<p>•	As soon as stories get to the deployed column, they are complete and are added to your financial summary.</p>
<p>•	Make sure you replenish your ready column by choosing appropriate stories to match the demands of your board as each story has a varied amount of work for each department.</p>
<p>•	There are 3 different types of cards, standard stories, intangible stories and fixed date stories. All can be used whenever you please.</p>
<p>o	Standard Stories: deliver subs, can be done whenever.</p>
<p>o	Intangible Stories: unknown rewards – likely to improve productivity. </p>
<p>o	Fixed Date Stories: must be completed by a specific date or become invalid.</p>
<p>•	At the end of each day you must pick up an Event Card this may need actioning, may be a reminder or prompt but they are picked up at the end of each day. </p>


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
