import React from "react";
import { IComment } from "../utils/types";
import styles from "./Comment.module.scss";

interface CommentProps {
  comment: IComment;
  removeComment: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, removeComment }) => {
  const { id, date, text } = comment;
  return (
    <section className={styles.comment}>
      <span onClick={() => removeComment(id)}>x</span>
      <div className={styles.text}>{text}</div>
      <div className={styles.date}>
        {new Date(date).toLocaleString().slice(0, 17)}
      </div>
    </section>
  );
};

export default Comment;
