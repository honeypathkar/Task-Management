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
    <div className="flex flex-col pt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Task Manager Dashboard
      </h1>
      <div className="flex justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-12">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
            {task.title}
          </h1>
          <p className="text-gray-700 mb-6 text-sm sm:text-base lg:text-lg">
            {task.description}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Due Date: <span>{task.dueDate}</span>
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Status: <span>{task.completed ? "Completed" : "Pending"}</span>
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
    </div>
  );
};

export default TaskDetails;
