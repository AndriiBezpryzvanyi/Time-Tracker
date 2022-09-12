import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { ITask } from "../../utils/types";
import { ReactComponent as RemoveIcon } from "../../assets/deleteIcon.svg";
import styles from "./TrackedItems.module.scss";
import { ReactComponent as FavoriteIcon } from "../../assets/favoriteIcon.svg";

enum Filtration {
  All,
  Favorites,
}

const TrackedItems: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [sortType, setSortType] = useState<Filtration>(Filtration.All);
  const [search, setSearch] = useState<string>("");
  const history = useHistory();

  const favorites = tasks.filter((t) => t.isFavorite);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  const onDelete = (name: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    const filteredList = tasks.filter((task) => task.name !== name);
    setTasks(filteredList);
    localStorage.setItem("tasks", JSON.stringify(filteredList));
  };

  const IsTasksFound = () => {
    const taskNotFound = <div className={styles.alert}>Tasks not found</div>;

    if (
      (sortType === Filtration.All && !tasks.length) ||
      (sortType === Filtration.Favorites && !favorites.length)
    ) {
      return taskNotFound;
    }
  };

  const filteredTasks = () => {
    if (!search) {
      return sortType === Filtration.All ? tasks : favorites;
    } else if (search) {
      return (sortType === Filtration.All ? tasks : favorites).filter(
        (task: ITask) => task.name.includes(search)
      );
    }
  };

  return (
    <section>
      <div className={styles.filter}>
        <div>
          Show:{" "}
          <span
            onClick={() => setSortType(Filtration.All)}
            className={clsx({
              [styles.selectedSort]: sortType === Filtration.All,
            })}
          >
            All
          </span>
          {" - "}
          <span
            onClick={() => setSortType(Filtration.Favorites)}
            className={clsx({
              [styles.selectedSort]: sortType === Filtration.Favorites,
            })}
          >
            Favorites
          </span>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {IsTasksFound()}
      {filteredTasks()?.map((item: ITask) => (
        <div
          className={styles.task}
          key={item.name}
          onClick={() => history.push(`/details/${item.name}`)}
        >
          <div className={styles.taskName}>
            {item.isFavorite && (
              <FavoriteIcon className={styles.favoriteIcon} />
            )}
            <div>{item.name}</div>
            <div>{item.user.name}</div>
          </div>
          <div>
            <div>From: {new Date(item.dateTimeFrom).toLocaleString()}</div>
            <div>To: {new Date(item.dateTimeTo).toLocaleString()}</div>
          </div>
          <button onClick={(e) => onDelete(item.name, e)}>
            Delete <RemoveIcon />
          </button>
        </div>
      ))}
    </section>
  );
};

export default TrackedItems;
