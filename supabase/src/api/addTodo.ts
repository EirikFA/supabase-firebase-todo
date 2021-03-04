import { supabase } from ".";
import { Todo, TodoInput } from "../types";

const addTodo = (todo: TodoInput) => supabase
  .from<Todo>("todos")
  .insert(todo);

export default addTodo;
