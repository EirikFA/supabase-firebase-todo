export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  userId: string;
}

export interface TodoInput {
  content: string;
  completed?: boolean;
  userId: string;
}

export type Filter = "all" | "active" | "completed";
