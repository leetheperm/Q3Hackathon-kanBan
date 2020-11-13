import * as React from "react";
import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { DraggableStyleProps, RowDiv } from "../Utils";
import { BoardState } from "./Board";

export type StoryCardData = {
  id: string;
  content?: string;
  blocked?: number;
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

  const blockedChanged = (change: React.ChangeEvent<HTMLInputElement>) => {
    var story = props.boardState.items[props.item.id];
    story.blocked = parseInt(change.target.value);
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
      {!!props.item.blocked && (
        <RowDiv>
          <BlockedDiv> {"Blocked!: "}</BlockedDiv>
          <StyledInput
            type="number"
            id="blocked"
            name="blocked"
            min="0"
            max="10000"
            value={props.item.blocked}
            onChange={blockedChanged}
          />
        </RowDiv>
      )}
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
  box-sizing: border-box;
  background-color: white;
  font-family: Helvetica, sans-serif;
  white-space: pre;
  width: 100%;
  padding: 5px;
  
`;

const TitleDiv = styled(InnerDiv)`
  box-sizing: border-box;
  font-size: 125%;
  margin-bottom: 2px;
  width: 100%;
  background-color: #231123;
  color: white;
`;

const DesignDiv = styled(InnerDiv)`
  background-color: #82204A;
  box-sizing: border-box;
  color: White;
  width: 100%;
`;

const DevDiv = styled(InnerDiv)`
  box-sizing: border-box;   
  background-color: #558C8C;
  color: White;
  width: 100%;
`;

const BlockedDiv = styled(InnerDiv)`
  background-color: #AF5AAF;
  box-sizing: border-box;
  color: White;
  width: 100%;
`;

const TestDiv = styled(InnerDiv)`
  background-color: #E8DB7D;
  box-sizing: border-box;
  color: black;
  width: 100%;
`;

const StyledDiv = styled.div<DraggableStyleProps>`
  box-sizing: border-box;
  padding: 3px;
  background-color: ${(props) => (props.isDragging ? "#A6C9C9" : "#e5eff5")};
  border-radius: 5px;
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
  box-sizing: border-box;
  width: 50px;
  padding: 0;
  margin: 0;
  text-align: right;
  border: 1px solid #e5eff5;
`;
