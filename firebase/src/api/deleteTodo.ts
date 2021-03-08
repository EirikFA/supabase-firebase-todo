import { firestore } from ".";

const deleteTodo = (id: string) => firestore
  .collection("todos")
  .doc(id)
  .delete();

export default deleteTodo;
