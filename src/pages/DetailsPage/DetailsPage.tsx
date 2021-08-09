import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ITask } from "../../utils/types";
import styles from './DetailsPage.module.scss';

const DetailsPage: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setCurrentTask(savedTasks.find((task: ITask) => task.name === id));
  }, [id]);

  return (
    <section>
      {!currentTask ? (
        <div>Task not found</div>
      ) : (
        <div>
          <div className={styles.title}>Task details</div>
          <div className={styles.info}>
            <div>Name:</div>
            <div>{currentTask.name}</div>
            <div>Description</div>
            <div><pre>{currentTask.description}</pre></div>
            <div>Time to:</div>
            <div>{new Date(currentTask.dateTimeTo).toUTCString()}</div>
            <div>Time from:</div>
            <div>{new Date(currentTask.dateTimeFrom).toUTCString()}</div>
            <div>Worker:</div>
            <div>{currentTask.user.name}</div>  
            <div>Username:</div>
            <div>{currentTask.user.username}</div>
            <div>Worker's phone:</div> 
            <div>{currentTask.user.phone}</div> 
            <div>Email:</div>
            <div>{currentTask.user.email}</div>
            <div>Address:</div>
            <div>
              {currentTask.user.address.city}, 
              {currentTask.user.address.street}, 
              {currentTask.user.address.suite},
            </div>
            <div>Company:</div>
            <div>{currentTask.user.company.name}</div> 
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailsPage;
