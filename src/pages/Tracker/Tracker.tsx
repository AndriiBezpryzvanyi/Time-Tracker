import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { BarLoader } from "react-spinners";
import { GET } from "../../API/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { ITask, IUser } from "../../utils/types";
import styles from "./Tracker.module.scss";
import { initialValuesForm, validationSchema } from "./constants";

const Tracker: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const history = useHistory();

  const getUsers = async () => {
    try {
      const { res } = await GET(`users`);
      setUsers(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    getUsers();
  }, []);

  const addTask = (value: ITask) => {
    const newTasks = [
      ...tasks,
      {
        name: value.name,
        dateTimeFrom: value.dateTimeFrom,
        dateTimeTo: value.dateTimeTo,
        description: value.description,
        user: value.user,
        isFavorite: value.isFavorite,
        comments: [],
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    history.push("/list");
  };

  if (!users.length) {
    return <BarLoader color="#0a76d2" width="100%" />;
  }

  return (
    <section className={styles.container}>
      <Formik
        initialValues={initialValuesForm(users[0])}
        onSubmit={addTask}
        validationSchema={validationSchema(tasks)}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <div className={styles.fieldWrapper}>
              <Field
                name="name"
                className={clsx(
                  styles.input,
                  touched.name && errors.name && styles.errorField
                )}
                placeholder="Task name"
              />
              <ErrorMessage name="name" component="span" />
            </div>
            <div className={styles.dates}>
              <div className={styles.fieldWrapper}>
                <Field
                  name="dateTimeFrom"
                  type="datetime-local"
                  className={clsx(
                    styles.input,
                    touched.dateTimeFrom &&
                      errors.dateTimeFrom &&
                      styles.errorField
                  )}
                />
                <ErrorMessage name="dateTimeFrom" component="span" />
              </div>
              <div className={styles.fieldWrapper}>
                <Field
                  name="dateTimeTo"
                  type="datetime-local"
                  className={clsx(
                    styles.input,
                    touched.dateTimeTo && errors.dateTimeTo && styles.errorField
                  )}
                />
                <ErrorMessage name="dateTimeTo" component="span" />
              </div>
            </div>
            <Field
              name="description"
              as="textarea"
              rows={5}
              className={clsx(styles.input, styles.textarea)}
              placeholder="Description"
            />

            <div className={styles.fieldWrapper}>
              <Field type="checkbox" name="isFavorite" id="isFavorite" />
              <label htmlFor="isFavorite">Add tasks to favorites</label>
            </div>

            <Field name="user" as="select" className={styles.input}>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </Field>
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              Add task
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Tracker;
