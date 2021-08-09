import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ITask } from "../../utils/types";
import styles from './TrackedItems.module.scss';

enum SortType {
  All,
  Favorites
}

const TrackedItems: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.All);
  const history = useHistory();


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  const onDelete = (name: string) => {
    const filteredList = tasks.filter((task) => task.name !== name);
    setTasks(filteredList);
    localStorage.setItem('tasks', JSON.stringify(filteredList));
  };

  return (
    <section>
      {!tasks.length && (
        <div className={styles.alert}>Tasks not found</div>
      )}
      <div className={styles.filter}>
        Show:{' '}
        <span
          onClick={() => setSortType(SortType.All)}
          className={clsx({ [styles.selectedSort]: sortType === SortType.All })}
        >
          All
        </span>{' - '}
        <span
          onClick={() => setSortType(SortType.Favorites)} 
          className={clsx({ [styles.selectedSort]: sortType === SortType.Favorites })}
        >
          Favorites
        </span>
      </div>
      {(sortType === SortType.All ? tasks : tasks.filter((t) => t.isFavorite)).map((item: ITask) => (
        <div className={styles.task} key={item.name}>
          <div>
            <div>{item.name}</div>
            <div>{item.user.name}</div>
          </div>
          <div>
            <div>From: {new Date(item.dateTimeFrom).toUTCString()}</div>
            <div>To: {new Date(item.dateTimeTo).toUTCString()}</div>
          </div>
          <div className={styles.actions}>
            <div onClick={() => history.push(`/details/${item.name}`)}>View</div>
            <div onClick={() => onDelete(item.name)}>Delete</div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TrackedItems;
