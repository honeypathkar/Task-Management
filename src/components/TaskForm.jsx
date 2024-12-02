import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ ...task, id: Date.now(), completed: false }));
    setTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <form
      className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Task</h2>
      <input
        type="text"
        placeholder="Title"
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="border border-gray-300 p-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <input
        type="date"
        placeholder="DD-MM-YY"
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
