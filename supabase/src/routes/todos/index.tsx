import { Fragment, FunctionComponent, h } from "preact";
import {
  useContext, useEffect, useMemo, useState
} from "preact/hooks";

import {
  addTodo, auth, deleteTodo as deleteTodoApi, editTodo, supabase
} from "../../api";
import Footer from "../../components/Footer";
import { SessionContext } from "../../components/app";
import TodoList from "../../components/todos/TodoList";
import { deleteArrayEl, updateArrayEl } from "../../helpers";
import { useInput, useOnKey } from "../../hooks";
import { Filter, Todo, TodoInput } from "../../types";
import style from "./index.scss";

const Todos: FunctionComponent = () => {
  const session = useContext(SessionContext);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [newTodo, onNewTodoInput, setNewTodo] = useInput<HTMLInputElement>();

  const addLocal = (todo: Todo): void => {
    setAllTodos(prev => [...prev, todo]);
  };

  const add = async (): Promise<void> => {
    if (!session) return;

    const { data } = await addTodo({
      content: newTodo,
      userId: session?.user.id
    });

    if (data && data.length > 0) {
      setNewTodo("");
      addLocal(data[0]);
    }
  };

  const onAddTodo = useOnKey<HTMLInputElement, []>("Enter", add);

  useEffect(() => {
    if (session?.user) {
      supabase.from("todos").select(`
        id,
        content,
        completed,
        userId
      `).then(res => setAllTodos(res.data || []));
    }
  }, [session?.user]);

  const filteredTodos = useMemo(() => allTodos.filter(todo => {
    switch (filter) {
      case "all":
        return true;

      case "active":
        return !todo.completed;

      case "completed":
        return todo.completed;

      default:
        return true;
    }
  }), [allTodos, filter]);
  const filterClassName = (f: Filter) => (f === filter ? "selected" : "");

  const logIn = () => auth.signIn({ provider: "github" });

  const logOut = () => auth.signOut();

  const editLocal = (id: string, updatedTodo: Partial<Todo>): void => {
    setAllTodos(prev => updateArrayEl(prev, "id", id, updatedTodo));
  };

  const deleteLocal = (id: string): void => {
    setAllTodos(prev => deleteArrayEl(prev, "id", id));
  };

  const toggle = async (id: string): Promise<void> => {
    const todo = allTodos.find(t => t.id === id);
    if (!todo) return;

    const editedTodo: Partial<TodoInput> = {
      completed: !todo.completed
    };

    editLocal(id, editedTodo);
    const { error, status } = await editTodo(id, editedTodo);

    // Roll back optimistic update on error
    if (error || !status.toString().startsWith("2")) {
      editLocal(id, { completed: todo?.completed });
    }
  };

  const edit = async (id: string, content: string): Promise<void> => {
    const original = allTodos.find(t => t.id === id);
    if (!original) return;

    const editedTodo: Partial<TodoInput> = { content };

    editLocal(id, editedTodo);
    const { error, status } = await editTodo(id, editedTodo);

    // Roll back optimistic update on error
    if (error || !status.toString().startsWith("2")) {
      editLocal(id, original);
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    const index = allTodos.findIndex(todo => todo.id === id);
    const todo = allTodos[index];

    deleteLocal(id);
    const { error, status } = await deleteTodoApi(id);

    // Roll back optimistic update on error
    if (error || !status.toString().startsWith("2")) {
      setAllTodos(prev => {
        const newTodos = prev.slice();
        newTodos.splice(index, 0, todo);
        return newTodos;
      });
    }
  };

  const clearCompleted = (): void => {
    allTodos.forEach(({ id, completed }) => {
      if (completed) deleteTodo(id);
    });
  };

  return (
    <Fragment>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyPress={onAddTodo}
            value={newTodo}
            onInput={onNewTodoInput}
          />
        </header>
        <section className="main">
          <TodoList todos={filteredTodos} toggle={toggle} edit={edit} deleteTodo={deleteTodo} />
        </section>

        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item left</span>

          <ul className="filters">
            <li>
              <a
                className={filterClassName("all")}
                href="#"
                onClick={() => setFilter("all")}
              >All
              </a>
            </li>
            <li>
              <a
                className={filterClassName("active")}
                href="#"
                onClick={() => setFilter("active")}
              >Active
              </a>
            </li>
            <li>
              <a
                className={filterClassName("completed")}
                href="#"
                onClick={() => setFilter("completed")}
              >Completed
              </a>
            </li>
          </ul>

          <button
            className="clear-completed"
            type="button"
            onClick={clearCompleted}
          >Clear completed
          </button>
        </footer>
      </section>

      {session
        ? <button className={style.authButton} type="button" onClick={logOut}>Log out</button>
        : <button className={style.authButton} type="button" onClick={logIn}>Log in with GitHub</button>}
      <Footer />
    </Fragment>
  );
};

export default Todos;
