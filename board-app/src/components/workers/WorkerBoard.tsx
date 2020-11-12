import React, { FC, useEffect } from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import { initialWorkerData } from "../../data/InitialWorkerData";
import { WorkerCardData, WorkerRole } from "./Worker";
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

enum DiceState {
  Ready,
  Rolled,
  Spent,
}

type WorkerBoardProps = {
  incrementDay: () => void;
};

export const WorkerBoard: FC<WorkerBoardProps> = (props) => {
  const [workerBoardState, setWorkerBoardState] = useState<WorkerBoardState>(
    initialWorkerData
  );

  const [designDiceState, setDesignDiceState] = useState<DiceState>(
    DiceState.Ready
  );
  const [designButtonText, setDesignButtonText] = useState<String>(
    "Roll for Design"
  );
  const [designDivText, setDesignDivText] = useState<String>("");

  const [devDiceState, setDevDiceState] = useState<DiceState>(DiceState.Ready);
  const [devButtonText, setDevButtonText] = useState<String>(
    "Roll for Development"
  );
  const [devDivText, setDevDivText] = useState<String>("");

  const [testDiceState, setTestDiceState] = useState<DiceState>(
    DiceState.Ready
  );
  const [testButtonText, setTestButtonText] = useState<String>("Roll for Test");
  const [testDivText, setTestDivText] = useState<String>("");

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

  const getDiceRoll = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const rollColumn = (
    colId: string,
    workerRole: WorkerRole,
    setDivText: (value: React.SetStateAction<String>) => void
  ) => {
    const designersInCol = workerBoardState.columns[colId].workerIds;

    const workers = designersInCol.map(
      (workerId: string) => workerBoardState.workers[workerId]
    );

    var totalRolled = 0;
    for (let worker of workers) {
      var roll = getDiceRoll();
      if (worker.role === workerRole) roll = roll * 2;
      totalRolled += roll;
    }
    setDivText("You've rolled: " + totalRolled);
  };

  const diceClicked = (
    colId: string,
    workerRole: WorkerRole,
    diceState: DiceState,
    setDiceState: (value: React.SetStateAction<DiceState>) => void,
    setDivText: (value: React.SetStateAction<String>) => void,
    setButtonText: (value: React.SetStateAction<String>) => void
  ) => {
    switch (diceState) {
      case DiceState.Ready:
        rollColumn(colId, workerRole, setDivText);
        setButtonText("Click here when you've spent it");
        break;
      case DiceState.Rolled:
        setDivText("You've used all your work for today");
        break;
    }
    setDiceState(diceState + 1);
  };

  const allStatesSpent = (
    state1: DiceState,
    state2: DiceState,
    state3: DiceState
  ) => {
    return (
      state1 === DiceState.Spent &&
      state2 === DiceState.Spent &&
      state3 === DiceState.Spent
    );
  };

  useEffect(() => {
    if (allStatesSpent(designDiceState, devDiceState, testDiceState)) {
      setDesignDiceState(DiceState.Ready);
      setDesignButtonText("Roll for Design");
      setDesignDivText("");

      setDevDiceState(DiceState.Ready);
      setDevButtonText("Roll for Development");
      setDevDivText("");

      setTestDiceState(DiceState.Ready);
      setTestButtonText("Roll for Test");
      setTestDivText("");

      props.incrementDay();
    }
  }, [designDiceState, devDiceState, testDiceState, props]);

  return (
    <>
      <>
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
                <WorkerColumn
                  key={column.id}
                  column={column}
                  workers={workers}
                />
              );
            })}
          </DragDropContext>
        </WorkerBoardE1>
      </>
      <>
        <DesignDiceButton
          onClick={() => {
            diceClicked(
              "worker-col-1",
              WorkerRole.Designer,
              designDiceState,
              setDesignDiceState,
              setDesignDivText,
              setDesignButtonText
            );
          }}
          disabled={designDiceState === DiceState.Spent}
        >
          {designButtonText}
        </DesignDiceButton>
        <div>{designDivText}</div>
        <DevDiceButton
          onClick={() => {
            diceClicked(
              "worker-col-2",
              WorkerRole.Developer,
              devDiceState,
              setDevDiceState,
              setDevDivText,
              setDevButtonText
            );
          }}
          disabled={devDiceState === DiceState.Spent}
        >
          {devButtonText}
        </DevDiceButton>
        <div>{devDivText}</div>
        <TestDiceButton
          onClick={() => {
            diceClicked(
              "worker-col-3",
              WorkerRole.Tester,
              testDiceState,
              setTestDiceState,
              setTestDivText,
              setTestButtonText
            );
          }}
          disabled={testDiceState === DiceState.Spent}
        >
          {testButtonText}
        </TestDiceButton>
        <div>{testDivText}</div>
      </>
    </>
  );
};

const WorkerBoardE1 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const DesignDiceButton = styled.button`
  padding: 3px;
  background-color: red;
  color: white;
  border-color: black;
`;

const DevDiceButton = styled.button`
  padding: 3px;
  background-color: blue;
  color: white;
  border-color: black;
`;

const TestDiceButton = styled.button`
  padding: 3px;
  background-color: orange;
  color: white;
  border-color: black;
`;
