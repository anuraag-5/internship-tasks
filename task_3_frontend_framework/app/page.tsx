"use client";

import { useState } from "react";
import {
  addTodo,
  updateTodo,
  removeTodo,
  completeTodo,
} from "@/lib/helperFuncs";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const MainPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    const newTodos = addTodo(todos, input);
    setTodos(newTodos);
    setInput("");
  };

  const handleUpdate = (id: number, newTitle: string) => {
    const updated = updateTodo(todos, id, newTitle);
    setTodos(updated);
  };

  const handleRemove = (id: number) => {
    const updated = removeTodo(todos, id);
    setTodos(updated);
  };

  const handleComplete = (id: number) => {
    const updated = completeTodo(todos, id);
    setTodos(updated);
  };

  return (
    <section className="bg-[#132230] min-h-screen w-full flex justify-center items-start pt-20">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Todo App
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border rounded text-black"
          />
          <button
            onClick={handleAdd}
            className="bg-black text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
            >
              <span
                onClick={() => handleComplete(todo.id)}
                className={`flex-1 cursor-pointer ${
                  todo.completed
                    ? "text-green-500"
                    : "text-black"
                }`}
              >
                {todo.title}
              </span>

              <div className="flex gap-2 ml-3">
                <button
                  onClick={() =>
                    handleUpdate(
                      todo.id,
                      prompt("Update todo", todo.title) || todo.title
                    )
                  }
                  className="text-sm text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleRemove(todo.id)}
                  className="text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No tasks yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default MainPage;