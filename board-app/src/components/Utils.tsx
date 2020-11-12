import styled from "styled-components";

export type DraggableStyleProps = {
  isDragging: boolean;
};

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColDiv = styled.div`
  display: flex;
  flex-direction: col;
`;
