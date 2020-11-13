import React, { FC, useEffect } from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import { initialWorkerData } from "../../data/InitialWorkerData";
import { RowDiv } from "../Utils";
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
  dayNumber: number;
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

  const [devDiceState, setDevDiceState] = useState<DiceState>(DiceState.Ready);
  const [devButtonText, setDevButtonText] = useState<String>(
    "Roll for Development"
  );

  const [testDiceState, setTestDiceState] = useState<DiceState>(
    DiceState.Ready
  );
  const [testButtonText, setTestButtonText] = useState<String>("Roll for Test");

  useEffect(() => {
    if (props.dayNumber === 12) {
      setWorkerBoardState(initialWorkerData);
    }
    if (props.dayNumber === 16) {
      var testColumn = workerBoardState.columns["worker-col-3"];
      testColumn.workerIds.push("Test3");
      var newBoardState: WorkerBoardState = {
        ...workerBoardState,
        workers: {
          ...workerBoardState.workers,
          Test3: {
            id: "Test3",
            role: WorkerRole.Tester,
          },
        },
        columns: {
          ...workerBoardState.columns,
        },
      };
      setWorkerBoardState(newBoardState);
    }
  }, [props.dayNumber]);

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
    setButtonText: (value: React.SetStateAction<String>) => void
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
    setButtonText("You've rolled: " + totalRolled);
  };

  const diceClicked = (
    colId: string,
    workerRole: WorkerRole,
    diceState: DiceState,
    setDiceState: (value: React.SetStateAction<DiceState>) => void,
    setButtonText: (value: React.SetStateAction<String>) => void
  ) => {
    switch (diceState) {
      case DiceState.Ready:
        rollColumn(colId, workerRole, setButtonText);
        break;
      case DiceState.Rolled:
        setButtonText("You've used all your work for today");
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

      setDevDiceState(DiceState.Ready);
      setDevButtonText("Roll for Development");

      setTestDiceState(DiceState.Ready);
      setTestButtonText("Roll for Test");

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
      <RowDiv>
        <DesignDiceButton
          onClick={() => {
            diceClicked(
              "worker-col-1",
              WorkerRole.Designer,
              designDiceState,
              setDesignDiceState,
              setDesignButtonText
            );
          }}
          disabled={designDiceState === DiceState.Spent}
        >
          {designButtonText}
        </DesignDiceButton>

        <DevDiceButton
          onClick={() => {
            diceClicked(
              "worker-col-2",
              WorkerRole.Developer,
              devDiceState,
              setDevDiceState,
              setDevButtonText
            );
          }}
          disabled={devDiceState === DiceState.Spent}
        >
          {devButtonText}
        </DevDiceButton>
        <TestDiceButton
          onClick={() => {
            diceClicked(
              "worker-col-3",
              WorkerRole.Tester,
              testDiceState,
              setTestDiceState,
              setTestButtonText
            );
          }}
          disabled={testDiceState === DiceState.Spent}
        >
          {testButtonText}
        </TestDiceButton>
      </RowDiv>
    </>
  );
};

const WorkerBoardE1 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const DesignDiceButton = styled.button`
  box-sizing: border-box;
  padding: 10px 20px;
  width: 150px;
  background-color: #82204A;
  color: white;
  border-radius: 15px;
  margin-left: 405px;
  border: 0;
  margin-bottom: 50px;
  height: 65px;

  &:hover {
    background-color: #E79DBD;
    cursor:pointer;
  }
`;

const DevDiceButton = styled.button`
  box-sizing: border-box;
  width: 150px;
  padding: 10px 20px;
  background-color: #558C8C;
  color: white;
  margin-left: 160px;
  border-radius: 15px;
  border: 0;
  margin-bottom: 50px;
  height: 65px;

  &:hover {
    background-color: #B3D0D0;
    cursor:pointer;
  }
`;

const TestDiceButton = styled.button`
  box-sizing: border-box;
  padding: 10px 20px;
  width: 150px;
  background-color: #E8DB7D;
  color: white;
  margin-left: 180px;
  border-radius: 15px;
  margin-bottom: 50px;
  height: 65px;
  border: 0;

  &:hover {
    background-color: #F3ECBA;
    cursor:pointer;
  }
`;
