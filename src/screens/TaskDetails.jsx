import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id))
  );

  if (!task) {
    return <p className="text-center text-red-500">Task not found!</p>;
  }

  return (
    <div className="flex justify-center pt-12 bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 mt-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{task.title}</h1>
        <p className="text-gray-700 mb-6">{task.description}</p>
        <p className="text-sm text-gray-600 mb-2">Due Date: {task.dueDate}</p>
        <p className="text-sm text-gray-600 mb-6">
          Status: {task.completed ? "Completed" : "Pending"}
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
