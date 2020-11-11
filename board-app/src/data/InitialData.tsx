import { BoardState } from "../components/Board";

export const initialBoardData: BoardState = {
  items: {
    "item-1": {
      id: "item-1",
      content: "story 1: make board",
      designToDo: 8,
      devToDo: 12,
      testToDo: 10,
    },
    "item-2": {
      id: "item-2",
      content: "story 2: do soemthing else",
      designToDo: 8,
      devToDo: 12,
      testToDo: 10,
    },
    "item-3": {
      id: "item-3",
      content: "Content of item 3.",
      designToDo: 8,
      devToDo: 12,
      testToDo: 10,
    },
    "item-4": {
      id: "item-4",
      content: "Content of item 4.",
      designToDo: 8,
      devToDo: 12,
      testToDo: 10,
    },
    "item-5": {
      id: "item-5",
      content: "Content of item 5.",
      designToDo: 8,
      devToDo: 12,
      testToDo: 10,
    },
    "item-6": {
      id: "item-6",
      content: "Content of item 6.",
      designToDo: 8,
      devToDo: 12,
      testToDo: 10,
    },
    "item-7": {
      id: "item-7",
      content: "Content of item 7.",
      designToDo: 0,
      devToDo: 0,
      testToDo: 0,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Ready(6)",
      itemIds: ["item-1", "item-2", "item-3", "item-4", "item-5", "item-6"],
    },
    "column-2": {
      id: "column-2",
      title: "Design Doing (3)",
      itemIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Design Done(3)",
      itemIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Dev Doing(5)",
      itemIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "Dev Done(5)",
      itemIds: [],
    },
    "column-6": {
      id: "column-6",
      title: "Test Doing(3)",
      itemIds: [],
    },
    "column-7": {
      id: "column-7",
      title: "Test Done(3)",
      itemIds: [],
    },
    "column-8": {
      id: "column-8",
      title: "Complete",
      itemIds: ["item-7"],
    },
  },
  columnsOrder: [
    "column-1",
    "column-2",
    "column-3",
    "column-4",
    "column-5",
    "column-6",
    "column-7",
    "column-8",
  ],
};
