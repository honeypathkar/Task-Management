import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleComplete, deleteTask } from "../features/tasks/taskSlice";
import { toast } from "react-toastify";

const TaskList = () => {
  const { tasks, filter } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    if (filter === "overdue")
      return new Date(task.dueDate) < new Date() && !task.completed;
    return true;
  });

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  const taskDelete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task Deleted");
  };

  const toggleTask = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Task List ({filteredTasks.length})
      </h2>
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks yet</div>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">
                  {" "}
                  {truncateDescription(task.description, 20)}
                </p>
                <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    toggleTask(task.id);
                    task.completed
                      ? toast.success("Mark as Pending")
                      : toast.success("Mark as Completed");
                  }}
                  className={`px-3 py-1 rounded ${
                    task.completed
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition`}
                >
                  {task.completed ? "Pending" : "Complete"}
                </button>
                <button
                  onClick={() => taskDelete(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
