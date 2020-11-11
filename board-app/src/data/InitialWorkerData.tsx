import { WorkerRole } from "../components/workers/Worker";
import { WorkerBoardState } from "../components/workers/WorkerBoard";

export const initialWorkerData: WorkerBoardState = {
  workers: {
    Des1: {
      id: "Des1",
      role: WorkerRole.Designer,
    },
    Des2: {
      id: "Des2",
      role: WorkerRole.Designer,
    },
    Dev1: {
      id: "Dev1",
      role: WorkerRole.Developer,
    },
    Dev2: {
      id: "Dev2",
      role: WorkerRole.Developer,
    },
    Dev3: {
      id: "Dev3",
      role: WorkerRole.Developer,
    },
    Test1: {
      id: "Test1",
      role: WorkerRole.Tester,
    },
    Test2: {
      id: "Test2",
      role: WorkerRole.Tester,
    },
  },
  columns: {
    "worker-col-0": {
      id: "worker-col-0",
      title: "Unassigned",
      workerIds: [],
    },
    "worker-col-1": {
      id: "worker-col-1",
      title: "Designers",
      workerIds: ["Des1", "Des2"],
    },
    "worker-col-2": {
      id: "worker-col-2",
      title: "Developers",
      workerIds: ["Dev1", "Dev2", "Dev3"],
    },
    "worker-col-3": {
      id: "worker-col-3",
      title: "Testers",
      workerIds: ["Test1", "Test2"],
    },
  },
  columnsOrder: [
    "worker-col-0",
    "worker-col-1",
    "worker-col-2",
    "worker-col-3",
  ],
};
