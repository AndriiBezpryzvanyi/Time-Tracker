import { ITask } from "../../utils/types";

export const rowInfo = (task: ITask) => [
  "Name:",
  task.name,
  "Description:",
  <pre>{task.description}</pre>,
  "Time to:",
  new Date(task.dateTimeTo).toLocaleString().slice(0, 17),
  "Time from:",
  new Date(task.dateTimeFrom).toLocaleString().slice(0, 17),
  "Worker:",
  task.user.name,
  "Username:",
  task.user.username,
  "Worker's phone:",
  task.user.phone,
  "Email:",
  task.user.email,
  "Address:",
  `${task.user.address.city}, ${task.user.address.street}, ${task.user.address.suite}`,
  "Company:",
  task.user.company.name,
];
