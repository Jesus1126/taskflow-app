import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import Bootstrap CSS

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleTaskCreated = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Task Manager</h1>
      <div className="card p-4 mb-4">
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>
      <div className="card p-4">
        <TaskList refreshSignal={refresh} />
      </div>
    </div>
  );
}

export default App;