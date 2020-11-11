import * as React from "react";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { DraggableStyleProps } from "../Utils";

export type StoryCardData = {
  id: string;
  content: string;
  designToDo: number;
  devToDo: number;
  testToDo: number;
  subscribers: number;
};

export type StoryCardProps = {
  index: number;
  item: StoryCardData;
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
  return (
    <StyledDiv isDragging={props.isDragging}>
      <TitleDiv>{props.item.id}</TitleDiv>
      <InnerDiv> {props.item.content} </InnerDiv>
      <InnerDiv>{subscribers}</InnerDiv>
      <DesignDiv> {"Design to do: " + props.item.designToDo}</DesignDiv>
      <DevDiv> {"Development to do: " + props.item.devToDo}</DevDiv>
      <TestDiv> {"Testing to do: " + props.item.testToDo}</TestDiv>
    </StyledDiv>
  );
};

const InnerDiv = styled.div`
  background-color: white;
`;

const TitleDiv = styled(InnerDiv)`
  font-size: 125%;
  text-decoration: underline;
  margin-bottom: 2px;
  background-color: white;
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
