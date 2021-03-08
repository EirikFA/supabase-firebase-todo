import {
  Fragment, FunctionComponent, h
} from "preact";
import { useRef, useState } from "preact/hooks";

import { useDoubleClick, useInput, useOnKey } from "../../hooks";
import { Todo } from "../../types";
import TodoItem from "./TodoItem";

export interface TodoListProps {
  todos: Todo[];
  edit: (id: string, content: string) => void;
  toggle: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: FunctionComponent<TodoListProps> = ({
  todos, edit, toggle, deleteTodo
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newContent, onContentChange, setNewContent] = useInput();
  const editRef = useRef<HTMLInputElement | null>();

  const submitEdit = (): void => {
    if (!editingId) return;

    edit(editingId, newContent);

    setNewContent("");
    setEditingId(null);
  };

  const handleStartEdit = useDoubleClick<HTMLLIElement, [string, string]>((_e, id, content) => {
    editRef.current?.focus();
    setNewContent(content);
    setEditingId(id);
  });
  const handleEditSubmit = useOnKey<HTMLInputElement, []>("Enter", () => submitEdit());

  return (
    <Fragment>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => {
          const input = (
            <input
              className="edit"
              type="text"
              value={newContent}
              onInput={onContentChange}
              onKeyPress={handleEditSubmit}
              ref={editRef}
            />
          );

          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              editing={editingId === todo.id}
              editInput={input}
              onClick={e => handleStartEdit(e, todo.id, todo.content)}
              onToggle={() => toggle(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default TodoList;
