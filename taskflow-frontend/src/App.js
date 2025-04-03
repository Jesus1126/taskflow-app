import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView"; // ✅ Import CalendarView
import Journal from "./components/Journal"; // ✅ Import Journal
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import Bootstrap CSS
import WeeklyStudyTracker from "./components/WeeklyStudyTracker"; // ✅ Add this

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

      <div className="card p-4 mb-4">
        <TaskList 
          refreshSignal={refresh}
          onTaskUpdated={handleTaskCreated}
        />
      </div>

      <div className="card p-4 mb-4">
        <CalendarView />
      </div>

      <div className="card p-4 mb-5">
        <Journal />
      </div>

      <div className="card p-4 mt-4">
        <WeeklyStudyTracker />
      </div>
      
    </div>
  );
}

export default App;