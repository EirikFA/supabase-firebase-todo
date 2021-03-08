import { firestore } from ".";
import { TodoInput } from "../types";

const editTodo = (id: string, newTodo: Partial<TodoInput>) => firestore
  .collection("todos")
  .doc(id)
  .update({ ...newTodo });

export default editTodo;
