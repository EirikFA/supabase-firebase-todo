import { supabase } from ".";
import { Todo } from "../types";

const deleteTodo = (id: string) => supabase
  .from<Todo>("todos")
  .delete()
  .match({ id });

export default deleteTodo;
