import { BoardState } from "../components/boardComponents/Board";

export const initialBoardData: BoardState = {
  items: {
    "Story 1": {
      id: "Story 1",
      content: "story 1: make board",
      designToDo: 10,
      devToDo: 11,
      testToDo: 11,
      subscribers: 11,
    },
    "Story 2": {
      id: "Story 2",
      content: "story 2: do soemthing else",
      designToDo: 12,
      devToDo: 13,
      testToDo: 12,
      subscribers: 12,
    },
    "Story 3": {
      id: "Story 3",
      designToDo: 11,
      devToDo: 12,
      testToDo: 11,
      subscribers: 11,
    },
    "Story 4": {
      id: "Story 4",
      content: "Content of Story 4.",
      designToDo: 8,
      devToDo: 11,
      testToDo: 11,
      subscribers: 10,
    },
    "Story 5": {
      id: "Story 5",
      content: "Content of Story 5.",
      designToDo: 12,
      devToDo: 14,
      testToDo: 13,
      subscribers: 13,
    },
    "Story 6": {
      id: "Story 6",
      content: "Content of Story 6.",
      designToDo: 9,
      devToDo: 11,
      testToDo: 12,
      subscribers: 11,
    },
    "Story 7": {
      id: "Story 7",
      content: "Content of Story 7.",
      designToDo: 10,
      devToDo: 13,
      testToDo: 14,
      subscribers: 12,
    },
    "Story 8": {
      id: "Story 8",
      content: "Content of Story 8.",
      designToDo: 8,
      devToDo: 9,
      testToDo: 14,
      subscribers: 10,
    },
    "Story 9": {
      id: "Story 9",
      content: "Content of Story 9.",
      designToDo: 9,
      devToDo: 13,
      testToDo: 15,
      subscribers: 12,
    },
    "Story 10": {
      id: "Story 10",
      content: "Content of Story 10.",
      designToDo: 10,
      devToDo: 10,
      testToDo: 12,
      subscribers: 11,
    },
    "Story 11": {
      id: "Story 11",
      content: "Content of Story 11.",
      designToDo: 12,
      devToDo: 11,
      testToDo: 15,
      subscribers: 13,
    },
    "Story 12": {
      id: "Story 12",
      content: "Content of Story 12.",
      designToDo: 7,
      devToDo: 10,
      testToDo: 13,
      subscribers: 10,
    },
    "Story 13": {
      id: "Story 13",
      content: "Content of Story 13.",
      designToDo: 8,
      devToDo: 11,
      testToDo: 12,
      subscribers: 10,
    },
    "Story 14": {
      id: "Story 14",
      content: "Content of Story 14.",
      designToDo: 7,
      devToDo: 10,
      testToDo: 11,
      subscribers: 10,
    },
    "Story 15": {
      id: "Story 15",
      content: "Content of Story 15.",
      designToDo: 5,
      devToDo: 9,
      testToDo: 8,
      subscribers: 7,
    },
    "Intangeable 1": {
      id: "Intangeable 1",
      content: "Database upgrade",
      designToDo: 4,
      devToDo: 5,
      testToDo: 10,
      subscribers: 0,
    },
    "Intangeable 2": {
      id: "Intangeable 2",
      content: "Refactor core system",
      designToDo: 1,
      devToDo: 13,
      testToDo: 6,
      subscribers: 0,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Ready(6)",
      itemIds: [
        "Story 1",
        "Story 2",
        "Story 3",
        "Story 4",
        "Story 5",
        "Story 6",
        "Story 7",
        "Story 8",
        "Story 9",
      ],
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
      itemIds: [
        "Story 10",
        "Story 11",
        "Story 12",
        "Story 13",
        "Story 14",
        "Story 15",
        "Intangeable 2",
      ],
    },
    "column-7": {
      id: "column-7",
      title: "Test Done(3)",
      itemIds: [],
    },
    "column-8": {
      id: "column-8",
      title: "Deployed",
      itemIds: ["Story 7"],
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
