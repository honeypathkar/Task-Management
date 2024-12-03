import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import TaskDashboard from "./screens/TaskDashborad";
import TaskDetails from "./screens/TaskDetails";
import EditTask from "./screens/EditTask";
import Alert from "./components/Alert";

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
          <Alert />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
