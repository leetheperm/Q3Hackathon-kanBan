import React, { FC } from "react";
import styled from "styled-components";
import { isArrayLiteralExpression } from "typescript";

export const RulesPage: FC = () => {
  return (
    <>
      <Header>INTRODUCTION</Header>
      <Para>
        The TrayPort Kanban game has been designed for employees to simulate a
        Kanban board with factors affecting decisions day by day. These factors
        can be external and internal and as a Team or Individual you must
        overcome these to try and make the most amount of money by delivering
        story cards to your customers.
      </Para>
      <Header>HOW TO PLAY</Header>
      <Para>
        • Each story card has a number of subscribers (subs) you will gain by
        completing each card. Your business model runs of making money from
        subscribers, so more story cards completed – more money earned!
      </Para>
      <Para>
        • Each story has a numerical value of the amount of work needed
        competition for both; Design, Development and Testing.
      </Para>
      <Para>
        • You must complete each division of work before moving the story card
        on to the right of the board.{" "}
      </Para>
      <Para>
        • Each dice, per column, represents the number of workers for each
        department, for example if 3 dice were in development that represents 3
        workers.{" "}
      </Para>
      <Para>
        • You will roll each column of dice once per day, starting with Testing,
        then Development and lastly Design – the aim of KanBan is pulling work
        to the right (competition) rather than pushing work in.{" "}
      </Para>
      <Para>
        • The sum of all the dice rolled per column per day is the total amount
        of work that will go into the cards within the column.{" "}
      </Para>
      <Para>
        • When the work is completed per card, the story may move to the next
        column to the right if the column has available WIP.{" "}
      </Para>
      <Para>
        • Each column has a WIP limit, you cannot exceed this number with the
        number of stories in the column.{" "}
      </Para>
      <Para>
        • You will see that to start with you will have 2 designers, 3
        developers and 2 testers. If these workers are working within their
        specialised columns (i.e. developers are working in the development
        column) they will get double their value. So, if for development, you
        rolled 2+3+1 you would get a total number of 12 to spend within the dev
        column.
      </Para>
      <Para>
        • However, with this game, bottlenecks can be a problem and so you may
        wish to move workers around, for example, putting a designer in
        development. If you do this the designer would only get the face value
        of the dice and that specific dice would not get double as the designer
        does not specialise in development.
      </Para>
      <Para>
        • As soon as stories get to the deployed column, they are complete and
        are added to your financial summary.
      </Para>
      <Para>
        • Make sure you replenish your ready column by choosing appropriate
        stories to match the demands of your board as each story has a varied
        amount of work for each department.
      </Para>
      <Para>
        • There are 3 different types of cards, standard stories, intangible
        stories and fixed date stories. All can be used whenever you please.
      </Para>
      <Para>o Standard Stories: deliver subs, can be done whenever.</Para>
      <Para>
        o Intangible Stories: unknown rewards – likely to improve productivity.{" "}
      </Para>
      <Para>
        o Fixed Date Stories: must be completed by a specific date or become
        invalid.
      </Para>
      <Para>
        • At the end of each day you must pick up an Event Card this may need
        actioning, may be a reminder or prompt but they are picked up at the end
        of each day.{" "}
      </Para>
    </>
  );
};

const Para = styled.p`
  color: white;
  font-family:helvetica;
  text-align: center;
  font-size:18px;
  width:70%;
  margin: 0 auto;
  line-height: 1.7em;
`;
const Header = styled.h1`
  color: white;
  font-family: helvetica;
  text-decoration: underline;
  text-align:center;
`;

