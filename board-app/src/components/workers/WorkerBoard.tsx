import React from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { initialWorkerData } from "../../data/InitialWorkerData";
import { WorkerCardData } from "./Worker";
import { WorkerColumn, WorkerColumnData } from "./WorkerColumn";

export type WorkerCardDictionary = {
  [index: string]: WorkerCardData;
};

export type WorkerColumnDictionary = {
  [index: string]: WorkerColumnData;
};

export type WorkerBoardState = {
  workers: WorkerCardDictionary;
  columns: WorkerColumnDictionary;
  columnsOrder: string[];
};

export const WorkerBoard: React.FC = () => {
  const [workerBoardState, setWorkerBoardState] = useState<WorkerBoardState>(
    initialWorkerData
  );
  // Handle drag & drop
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return;
    }

    // Do nothing if the item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find column from which the item was dragged from
    const columnStart = workerBoardState.columns[source.droppableId];

    // Find column in which the item was dropped
    const columnFinish = workerBoardState.columns[destination.droppableId];

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemIds = Array.from(columnStart.workerIds);

      // Remove the id of dragged item from its original position
      newItemIds.splice(source.index, 1);

      // Insert the id of dragged item to the new position
      newItemIds.splice(destination.index, 0, draggableId);

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemIds: newItemIds,
      };

      // Create new board state with updated data for columns
      const newState = {
        ...workerBoardState,
        columns: {
          ...workerBoardState.columns,
          [newColumnStart.id]: newColumnStart,
        },
      };

      // Update the board state with new data
      setWorkerBoardState(newState);
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemIds = Array.from(columnStart.workerIds);

      // Remove the id of dragged item from its original position
      newStartItemIds.splice(source.index, 1);

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        workerIds: newStartItemIds,
      };

      // Get all item ids in destination list
      const newFinishItemIds = Array.from(columnFinish.workerIds);

      // Insert the id of dragged item to the new position in destination list
      newFinishItemIds.splice(destination.index, 0, draggableId);

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        workerIds: newFinishItemIds,
      };

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...workerBoardState,
        columns: {
          ...workerBoardState.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      };

      // Update the board state with new data
      setWorkerBoardState(newState);
    }
  };

  return (
    <WorkerBoardE1>
      <DragDropContext onDragEnd={onDragEnd}>
        {workerBoardState.columnsOrder.map((columnId) => {
          // Get id of the current column
          const column = workerBoardState.columns[columnId];

          // Get item belonging to the current column
          const workers = column.workerIds.map(
            (workerId: string) => workerBoardState.workers[workerId]
          );

          return (
            <WorkerColumn key={column.id} column={column} workers={workers} />
          );
        })}
      </DragDropContext>
    </WorkerBoardE1>
  );
};

const WorkerBoardE1 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 25px;
`;
