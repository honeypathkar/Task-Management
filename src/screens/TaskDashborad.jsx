import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";

const TaskDashboard = () => (
  <div className="flex flex-col items-center p-6 pt-20">
    <h1 className="text-3xl font-bold text-gray-800 mb-10">
      Task Manager Dashboard
    </h1>
    <div className="flex flex-col lg:flex-row gap-6">
      <TaskForm />
      <div className="flex flex-col gap-4">
        <FilterBar />
        <TaskList />
      </div>
    </div>
  </div>
);

export default TaskDashboard;
