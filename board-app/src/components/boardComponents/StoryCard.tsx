import * as React from "react";
import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { DraggableStyleProps, RowDiv } from "../Utils";
import { BoardState } from "./Board";

export type StoryCardData = {
  id: string;
  content?: string;
  designToDo: number;
  devToDo: number;
  testToDo: number;
  subscribers: number;
};

export type StoryCardProps = {
  index: number;
  item: StoryCardData;
  boardState: BoardState;
  setBoardState: (value: React.SetStateAction<BoardState>) => void;
};

export const StoryCard: FC<StoryCardProps> = (props) => {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided: any, snapshot: any) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <StoryCardInner isDragging={snapshot.isDragging} {...props} />
        </div>
      )}
    </Draggable>
  );
};

const StoryCardInner: FC<StoryCardProps & DraggableStyleProps> = (props) => {
  const [dev, setDev] = useState(props.item.devToDo);
  const [test, setTest] = useState(props.item.testToDo);

  let subscribers: string = "";
  if (props.item.subscribers > 0) {
    subscribers = "Subs: " + props.item.subscribers;
  }

  const designChanged = (change: React.ChangeEvent<HTMLInputElement>) => {
    var story = props.boardState.items[props.item.id];
    story.designToDo = parseInt(change.target.value);
    const newBoardState = {
      ...props.boardState,
      items: {
        ...props.boardState.items,
        [props.item.id]: story,
      },
    };
    props.setBoardState(newBoardState);
  };

  const devChanged = (change: React.ChangeEvent<HTMLInputElement>) => {
    var story = props.boardState.items[props.item.id];
    story.devToDo = parseInt(change.target.value);
    const newBoardState = {
      ...props.boardState,
      items: {
        ...props.boardState.items,
        [props.item.id]: story,
      },
    };
    props.setBoardState(newBoardState);
  };

  const testChanged = (change: React.ChangeEvent<HTMLInputElement>) => {
    var story = props.boardState.items[props.item.id];
    story.testToDo = parseInt(change.target.value);
    const newBoardState = {
      ...props.boardState,
      items: {
        ...props.boardState.items,
        [props.item.id]: story,
      },
    };
    props.setBoardState(newBoardState);
  };

  return (
    <StyledDiv isDragging={props.isDragging}>
      <TitleDiv>{props.item.id}</TitleDiv>
      {!!props.item.content && <InnerDiv> {props.item.content} </InnerDiv>}
      <InnerDiv>{subscribers}</InnerDiv>
      <RowDiv>
        <DesignDiv> {"Design to do: "} </DesignDiv>
        <StyledInput
          type="number"
          id="designToDo"
          name="designToDo"
          min="0"
          max="10000"
          value={props.item.designToDo}
          onChange={designChanged}
        />
      </RowDiv>
      <RowDiv>
        <DevDiv> {"Dev to do: "}</DevDiv>
        <StyledInput
          type="number"
          id="devToDo"
          name="devToDo"
          min="0"
          max="10000"
          value={props.item.devToDo}
          onChange={devChanged}
        />
      </RowDiv>
      <RowDiv>
        <TestDiv> {"Testing to do: "}</TestDiv>
        <StyledInput
          type="number"
          id="testToDo"
          name="testToDo"
          min="0"
          max="10000"
          value={props.item.testToDo}
          onChange={testChanged}
        />
      </RowDiv>
    </StyledDiv>
  );
};

const InnerDiv = styled.div`
  background-color: white;
  white-space: pre;
`;

const TitleDiv = styled(InnerDiv)`
  font-size: 125%;
  text-decoration: underline;
  margin-bottom: 2px;
`;

const DesignDiv = styled(InnerDiv)`
  background-color: red;
  color: White;
  margin: 1px;
`;

const DevDiv = styled(InnerDiv)`
  background-color: blue;
  color: White;
  margin: 1px;
`;

const TestDiv = styled(InnerDiv)`
  background-color: orange;
  color: White;
  margin: 1px;
`;

const StyledDiv = styled.div<DraggableStyleProps>`
  padding: 3px;
  background-color: ${(props) => (props.isDragging ? "#d3e4ee" : "black")};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;
  margin: 10px;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`;

const StyledInput = styled.input`
  text-align: right;
  width: 50px;
`;
