import React from "react";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

export enum WorkerRole {
  Designer,
  Developer,
  Tester,
}

export type WorkerCardData = {
  id: string;
  role: WorkerRole;
};

export type WorkerCardProps = {
  index: number;
  worker: WorkerCardData;
};

export const WorkerCard: FC<WorkerCardProps> = (props) => {
  return (
    <Draggable draggableId={props.worker.id} index={props.index}>
      {(provided: any, snapshot: any) => (
        <InnerDiv
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          color={getColourForRole(props.worker.role)}
        >
          {props.worker.id}
        </InnerDiv>
      )}
    </Draggable>
  );
};

const InnerDiv = styled.div`
  color: white;
  padding: 3px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;
  font-family: Helvetica, sans-serif;
  margin: 10px;
  text-align: center;

  &:hover {
    background-color: #EFF7FF;
  }

  & + & {
    margin-top: 4px;
  }
`;

const getColourForRole = (role: WorkerRole) => {
  if (role === WorkerRole.Designer) return "#82204A";
  else if (role === WorkerRole.Developer) return "#558C8C";
  else if (role === WorkerRole.Tester) return "#E8DB7D";
};
