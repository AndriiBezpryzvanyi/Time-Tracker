import { ITask, IUser } from "../../utils/types";
import * as Yup from "yup";

const currentDate = new Date().toISOString().slice(0, 16);

export const initialValuesForm = (firstUser: IUser) => {
  return {
    name: "",
    description: "",
    dateTimeFrom: currentDate,
    dateTimeTo: currentDate,
    user: firstUser,
    isFavorite: false,
    comments: [],
  };
};

export const validationSchema = (tasks: ITask[]) =>
  Yup.object().shape({
    name: Yup.string()
      .min(2, "*Too Short")
      .max(70, "*Too Long")
      .required("*Required")
      .test(
        "Name matching",
        "*A task with this name already exists",
        (value) => !!!tasks.find((item) => item.name === value?.trim())
      ),
    dateTimeFrom: Yup.date().min(currentDate, "*Can't be in the past"),
    dateTimeTo: Yup.date().when(
      "dateTimeFrom",
      (dateTimeFrom, yup) =>
        dateTimeFrom &&
        yup.min(dateTimeFrom, "*It cannot be earlier than the start date")
    ),
  });
