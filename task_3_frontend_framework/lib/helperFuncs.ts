import { Todo } from "./types";

export const addTodo = (todos: Todo[], title: string): Todo[] => {
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };

  return [...todos, newTodo];
};

export const updateTodo = (
  todos: Todo[],
  id: number,
  newTitle: string
): Todo[] => {
  return todos.map((todo) =>
    todo.id === id
      ? { ...todo, title: newTitle }
      : todo
  );
};

export const removeTodo = (
  todos: Todo[],
  id: number
): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};

export const completeTodo = (
  todos: Todo[],
  id: number
): Todo[] => {
  return todos.map((todo) =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );
};