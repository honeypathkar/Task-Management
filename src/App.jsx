import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import TaskDashboard from "./components/TaskDashborad";
import TaskDetails from "./components/TaskDetails";
import EditTask from "./components/EditTask";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<TaskDashboard />} />
            <Route path="task/:id" element={<TaskDetails />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
