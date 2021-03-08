import { firestore } from ".";
import { TodoInput } from "../types";

const addTodo = (todo: TodoInput) => {
  const newTodo = { ...todo };

  // `!newTodo.completed` would produce the same result here,
  // but checking for `undefined` is more explicit
  if (typeof newTodo.completed === "undefined") {
    newTodo.completed = false;
  }

  return firestore
    .collection("todos")
    .add(newTodo);
};

export default addTodo;
