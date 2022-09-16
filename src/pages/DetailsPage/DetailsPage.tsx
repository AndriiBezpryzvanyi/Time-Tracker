import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IComment, ITask } from "../../utils/types";
import Comment from "../../components/Comment";
import styles from "./DetailsPage.module.scss";

const DetailsPage: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setCurrentTask(savedTasks.find((task: ITask) => task.name === id));
  }, [id]);

  const updateSavedTask = (changedTask: ITask) => {
    setCurrentTask(changedTask as ITask);
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        savedTasks.map((task: ITask) =>
          task.name === currentTask?.name ? changedTask : task
        )
      )
    );
  };

  const addComment = () => {
    if (commentText && currentTask) {
      updateSavedTask({
        ...currentTask,
        comments: [
          ...(currentTask.comments || []),
          {
            text: commentText,
            date: new Date(),
          },
        ],
      });
      setCommentText("");
    }
  };

  const favoriteToggle = () => {
    if (currentTask) {
      updateSavedTask({
        ...currentTask,
        isFavorite: !currentTask.isFavorite,
      });
    }
  };

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
            <div>
              <pre>{currentTask.description}</pre>
            </div>
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
              {currentTask.user.address.city},{currentTask.user.address.street},
              {currentTask.user.address.suite},
            </div>
            <div>Company:</div>
            <div>{currentTask.user.company.name}</div>
          </div>
          <div className={styles.actionButton} onClick={favoriteToggle}>
            {currentTask.isFavorite
              ? "Remove from favorite"
              : "Add to favorite"}
          </div>

          <div className={styles.title}>Task comments</div>
          <div className={styles.comments}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={5}
              className={styles.textarea}
              placeholder="Comment text..."
            ></textarea>
            <button className={styles.button} onClick={addComment}>
              Add comment
            </button>
            {currentTask.comments?.map((item: IComment) => (
              <Comment
                key={item.date.toString()}
                date={item.date}
                text={item.text}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailsPage;
