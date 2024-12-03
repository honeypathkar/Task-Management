import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleComplete, deleteTask } from "../features/tasks/taskSlice";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneIcon from "@mui/icons-material/Done";

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
    <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto md:p-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center md:text-2xl">
        Task List ({filteredTasks.length})
      </h2>
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks yet</div>
      ) : (
        <ul className="space-y-6">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <div
                className="cursor-pointer flex-1"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {truncateDescription(task.description, 30)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Due: {task.dueDate}
                </p>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0 md:ml-6">
                <button
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                  className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    toggleTask(task.id);
                    task.completed
                      ? toast.success("Marked as Pending")
                      : toast.success("Marked as Completed");
                  }}
                  className={`px-3 py-2 rounded ${
                    task.completed
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition`}
                >
                  {task.completed ? <PendingActionsIcon /> : <DoneIcon />}
                </button>
                <button
                  onClick={() => taskDelete(task.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  <DeleteIcon />
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
