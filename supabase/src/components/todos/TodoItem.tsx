import { FunctionComponent, h, JSX } from "preact";

import { Todo } from "../../types";

export interface TodoItemProps {
  todo: Todo;
  editing: boolean;
  onClick: JSX.MouseEventHandler<HTMLLIElement>;
  onToggle: JSX.GenericEventHandler<HTMLInputElement>;
  onDelete: JSX.MouseEventHandler<HTMLButtonElement>;
  editInput: JSX.Element;
}

const TodoItem: FunctionComponent<TodoItemProps> = (
  {
    todo: { id, content, completed },
    editing,
    onClick,
    onToggle,
    onDelete,
    editInput
  }
) => (
  <li
    className={`${completed ? "completed" : ""}${editing ? " editing" : ""}`}
    onClick={onClick}
  >
    <div className="view">
      <input
        id={`todo-${id}`}
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <label htmlFor={`todo-${id}`}>{content}</label>
      <button className="destroy" type="button" onClick={onDelete} />
    </div>

    {editing && editInput}
  </li>
);

export default TodoItem;
