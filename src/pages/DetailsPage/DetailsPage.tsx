import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IComment, ITask } from "../../utils/types";
import Comment from "../../components/Comment";
import { rowInfo } from "./constants";
import styles from "./DetailsPage.module.scss";
import { ReactComponent as FavoriteIcon } from "../../assets/favoriteIcon.svg";

const DetailsPage: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setCurrentTask(savedTasks.find((task: ITask) => task.name === name));
  }, [name]);

  const updateSavedTask = (changedTask: ITask) => {
    setCurrentTask(changedTask);
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
            id: Date.now(),
            text: commentText,
            date: new Date(),
          },
        ],
      });
      setCommentText("");
    }
  };

  const removeComment = (id: number) => {
    currentTask &&
      updateSavedTask({
        ...currentTask,
        comments: currentTask?.comments?.filter((item) => item.id !== id),
      });
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
          <div className={styles.title}>
            Task details {currentTask.isFavorite && <FavoriteIcon />}
          </div>
          <div className={styles.info}>
            {rowInfo(currentTask).map((item: string | JSX.Element, index) => (
              <div key={index}>{item}</div>
            ))}
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
                key={item.id}
                comment={item}
                removeComment={removeComment}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailsPage;
