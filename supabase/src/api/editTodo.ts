import { supabase } from ".";
import { Todo, TodoInput } from "../types";

const editTodo = (id: string, newTodo: Partial<TodoInput>) => supabase
  .from<Todo>("todos")
  .update(newTodo)
  .match({ id });

export default editTodo;
