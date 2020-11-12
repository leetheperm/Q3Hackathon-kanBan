import * as React from "react";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BoardState } from "./Board";

import { StoryCard, StoryCardData } from "./StoryCard";

// Define types for board column element properties
export type BoardColumnProps = {
  key: string;
  column: any;
  items: StoryCardData[];
  boardState: BoardState;
  setBoardState: (value: React.SetStateAction<BoardState>) => void;
};

export type ColumnData = {
  id: string;
  title: string;
  itemIds: string[];
};

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean;
};

// Create and export the BoardColumn component
export const BoardColumn: FC<BoardColumnProps> = (props) => {
  let title: string = props.column.title;
  if (props.column.title === "Deployed") {
    title = title + " - Total Subs: ";
    const array = props.items.map(
      (item: StoryCardData, index: number) => item.subscribers
    );
    if (array.length > 0) {
      const totalSubs = array.reduce(function (a: number, b: number) {
        return a + b;
      });
      title = title + totalSubs;
    }
  }
  return (
    <BoardColumnWrapper>
      <BoardColumnTitle>{title}</BoardColumnTitle>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item: any, index: number) => (
              <StoryCard
                item={item}
                index={index}
                boardState={props.boardState}
                setBoardState={props.setBoardState}
              />
            ))}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  );
};

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`;

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-bottom: 12px;
`;

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${(props) => (props.isDraggingOver ? "#aecde0" : null)};
  border-radius: 4px;
`;
