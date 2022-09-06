import clsx from "clsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ITask, IUser } from "../../utils/types";
import styles from "./Tracker.module.scss";
import { initialValuesForm, validationSchema } from "./constants";

const Tracker: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const history = useHistory();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((e) => console.log(e));
  }, []);

  const addTask = (value: ITask) => {
    // if (taskName && !tasks.find((task) => task.name === taskName)) {
    //   const newTasks = [
    //     ...tasks,
    //     {
    //       name: taskName,
    //       dateTimeFrom: timeFrom,
    //       dateTimeTo: timeTo,
    //       description,
    //       user: selectedUser!,
    //       isFavorite: true,
    //       comments: [],
    //     },
    //   ];
    //   localStorage.setItem("tasks", JSON.stringify(newTasks));
    //   setTasks(newTasks);
    //   history.push("/list");
    // }
    console.log(value);
  };

  if (!!!users.length) {
    return <div>Loading...</div>;
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
              Add time
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Tracker;
