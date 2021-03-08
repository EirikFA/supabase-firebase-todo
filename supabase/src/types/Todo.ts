export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  user_id: string;
}

export interface TodoInput {
  content: string;
  completed?: boolean;
  user_id: string;
}

export type Filter = "all" | "active" | "completed";
