import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editTask } from "../features/tasks/taskSlice";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === parseInt(id))
  );

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({ id: parseInt(id), title, description, dueDate }));
    navigate("/");
    toast.success("Task Changes Successfully");
  };

  if (!task) {
    return <div className="text-center text-gray-500">Task not found</div>;
  }

  return (
    <div className="flex flex-col pt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Task Manager Dashboard
      </h1>
      <div className="flex justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-12 w-full max-w-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 text-center">
            Edit Task
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
