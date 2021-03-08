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
    todo: { content, completed },
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
        className="toggle"
        type="checkbox"
        checked={completed}
        onClick={onToggle}
      />
      <label>{content}</label>
      <button className="destroy" type="button" onClick={onDelete} />
    </div>

    {editing && editInput}
  </li>
);

export default TodoItem;
