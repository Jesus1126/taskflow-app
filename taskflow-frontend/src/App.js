import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";
import TodoToday from "./components/TodoToday";
import Journal from "./components/Journal";
import WeeklyStudyTracker from "./components/WeeklyStudyTracker"; // ✅ Import it
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleTaskCreated = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">📋 TaskFlow Dashboard</h1>

      {/* Top Row: Task Form & Journal + WeeklyStudyBar Side by Side */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <Journal />
            <hr />
            <WeeklyStudyTracker goal={20} /> {/* ✅ Study bar inside same card */}
          </div>
        </div>
      </div>

      {/* Middle Row: Task List & To-Do List */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <TaskList refreshSignal={refresh} onTaskUpdated={handleTaskCreated} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <TodoToday />
          </div>
        </div>
      </div>

      {/* Bottom Row: Calendar Full Width */}
      <div className="row">
        <div className="col-12">
          <div className="card p-3">
            <CalendarView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;