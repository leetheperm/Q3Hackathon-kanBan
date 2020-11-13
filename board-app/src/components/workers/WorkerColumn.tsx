import * as React from "react";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { WorkerCard, WorkerCardData } from "./Worker";

export type WorkerColumnProps = {
  key: string;
  column: any;
  workers: any;
};

type WorkerColumnContentStylesProps = {
  isDraggingOver: boolean;
};

export type WorkerColumnData = {
  id: string;
  title: string;
  workerIds: string[];
};

export const WorkerColumn: FC<WorkerColumnProps> = (props) => {
  return (
    <WorkerColumnWrapper>
      <WorkerColumnTitle>{props.column.title}</WorkerColumnTitle>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <WorkerColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.workers.map((worker: WorkerCardData, index: number) => (
              <WorkerCard worker={worker} index={index} />
            ))}
            {provided.placeholder}
          </WorkerColumnContent>
        )}
      </Droppable>
    </WorkerColumnWrapper>
  );
};

// Create styles for WorkerColumnWrapper element
const WorkerColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;
  font-family: Helvetica, sans-serif;

  & + & {
    margin-left: 12px;
  }
`;

// Create styles for WorkerColumnTitle element
const WorkerColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-bottom: 12px;
  font-family: Helvetica, sans-serif;

`;

// Create styles for WorkerColumnContent element
const WorkerColumnContent = styled.div<WorkerColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${(props) => (props.isDraggingOver ? "#aecde0" : null)};
  border-radius: 4px;
`;
