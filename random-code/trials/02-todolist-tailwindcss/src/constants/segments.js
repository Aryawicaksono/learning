export const Status = Object.freeze({
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2,
});

const statusLabel = {
  [Status.ALL]: "All",
  [Status.ACTIVE]: "Active",
  [Status.COMPLETED]: "Completed",
};
export const statuses = [
  statusLabel[Status.ALL],
  statusLabel[Status.ACTIVE],
  statusLabel[Status.COMPLETED],
];
