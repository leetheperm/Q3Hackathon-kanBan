import * as React from 'react';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { initialBoardData } from '../data/InitialData';
import { BoardColumn, ColumnData } from './BoardColumn';
import { StoryCardData } from './StoryCard';

export type StoryCardDictionary = {
  [index:string]:StoryCardData
}

export type ColumnDictionary = {
  [index:string]:ColumnData
}

export type BoardState ={
    items:StoryCardDictionary,
    columns: ColumnDictionary,
    columnsOrder: string[];
}

export const  Board: React.FC = ()=>{
    const [boardState, setState] = useState<BoardState>(initialBoardData); 
    // Handle drag & drop
    const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Find column from which the item was dragged from
    const columnStart = (boardState.columns as any)[source.droppableId]

    // Find column in which the item was dropped
    const columnFinish = (boardState.columns as any)[destination.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemIds = Array.from(columnStart.itemIds)

      // Remove the id of dragged item from its original position
      newItemIds.splice(source.index, 1)

      // Insert the id of dragged item to the new position
      newItemIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemIds: newItemIds
      }

      // Create new board state with updated data for columns
      const newState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [newColumnStart.id]: newColumnStart
        }
      }

      // Update the board state with new data
      setState(newState);
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemIds = Array.from(columnStart.itemIds)

      // Remove the id of dragged item from its original position
      newStartItemIds.splice(source.index, 1)

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemIds: newStartItemIds
      }

      // Get all item ids in destination list
      const newFinishItemIds = Array.from(columnFinish.itemIds)

      // Insert the id of dragged item to the new position in destination list
      newFinishItemIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemIds: newFinishItemIds
      }

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      }

      // Update the board state with new data
      setState(newState);
    }
  }

    return(
        <BoardEl>
          <DragDropContext onDragEnd={onDragEnd}>
            {boardState.columnsOrder.map(columnId => {
              // Get id of the current column
              const column = boardState.columns[columnId]
  
              // Get item belonging to the current column
              const items = column.itemIds.map((itemId: string) => boardState.items[itemId])
  
              // Render the BoardColumn component
              return <BoardColumn key={column.id} column={column} items={items} />
            })}
          </DragDropContext>
        </BoardEl>
      )
}


const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
  