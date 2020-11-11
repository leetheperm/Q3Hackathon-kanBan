import * as React from 'react';
import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';


// Define types for board item element properties
export type StoryCardProps = {
  index: number
  item: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type StoryCardStyleProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<StoryCardStyleProps>`
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`

// Create and export the BoardItem component
export const StoryCard: FC<StoryCardProps> = (props) => {
  return <Draggable draggableId={props.item.id} index={props.index}>
    {(provided:any, snapshot:any) => (
      <BoardItemEl
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {props.item.content}
      </BoardItemEl>
    )}
  </Draggable>
}