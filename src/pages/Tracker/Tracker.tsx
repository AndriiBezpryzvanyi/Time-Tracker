import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ITask, IUser } from "../../utils/types";
import styles from "./Tracker.module.scss";

const Tracker: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [timeFrom, setTimeFrom] = useState<Date>(new Date());
  const [timeTo, setTimeTo] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
        res.data.length && setSelectedUser(res.data[0]);
      })
      .catch((e) => console.log(e));
  }, []);

  const addTask = () => {
    if (taskName && !tasks.find((task) => task.name === taskName)) {
      const newTasks = [
        ...tasks,
        {
          name: taskName,
          dateTimeFrom: timeFrom,
          dateTimeTo: timeTo,
          description,
          user: selectedUser!,
          isFavorite: true,
          comments: [],
        },
      ];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      setTasks(newTasks);
      history.push("/list");
    }
  };
  return (
    <section className={styles.container}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            type="text"
            className={styles.input}
            placeholder="Task name"
          />
          <div className={styles.dates}>
            <input
              type="datetime-local"
              className={styles.input}
              value={timeFrom.toISOString().slice(0, 16)}
              onChange={(e) => setTimeFrom(new Date(e.target.value))}
            />
            <input
              type="datetime-local"
              className={styles.input}
              value={timeTo.toISOString().slice(0, 16)}
              onChange={(e) => setTimeTo(new Date(e.target.value))}
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className={clsx(styles.input, styles.textarea)}
            placeholder="Description"
          ></textarea>
          <select
            className={styles.input}
            value={selectedUser?.id}
            onChange={(e) =>
              setSelectedUser(
                users.find((u: IUser) => u.id === +e.target.value) || null
              )
            }
          >
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button className={styles.button} onClick={addTask}>
            Add time
          </button>
        </>
      )}
    </section>
  );
};

export default Tracker;
