import React, { useState, useEffect } from "react";

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

const Todo = () => {
  const [ToDo, setToDo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ToDo.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = ToDo;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: ToDo, completed: false }]);
    }

    setToDo("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setToDo(todos[index].text);
    setEditIndex(index);
  };

  const toggleCompleted = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        
        <h1 className="text-3xl font-bold text-center text-blue-500 dark:text-blue-400 mb-6">
          My ToDo List
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter task..."
            className="grow px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={ToDo}
            onChange={(e) => setToDo(e.target.value)}
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700"
          >
            <PlusIcon />
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        {todos.length > 0 && (
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">

            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
              All Tasks:
            </h2>

            <ul className="space-y-3">
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleCompleted(index)}
                    />

                    <span
                      className={`${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editTodo(index)}
                      className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

          </div>
        )}

      </div>
    </div>
  );
};

export default Todo;
