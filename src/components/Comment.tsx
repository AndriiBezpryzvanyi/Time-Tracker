import React from "react";
import { IComment } from "../utils/types";
import styles from './Comment.module.scss';

const Comment: React.FC<IComment> = ({ date, text}) => {
  return (
    <section className={styles.comment}>
      <div className={styles.text}>{text}</div>
      <div className={styles.date}>{new Date(date).toUTCString()}</div>
    </section>
  );
}

export default Comment;
