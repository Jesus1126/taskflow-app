import React, { useEffect, useState } from "react";
import axios from "axios";

function TodoToday() {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);

  // Ensures YYYY-MM-DD format like '2025-03-27'
  const formatDate = (date) => {
    return date.toLocaleDateString("en-CA"); 
  };

  const today = formatDate(new Date());

  useEffect(() => {
    axios.get("http://localhost:5253/api/Tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error("Failed to fetch tasks:", err));
  }, []);

  const todayTasks = tasks.filter(
    task => formatDate(new Date(task.dueDate)) === today
  );

  const handleCheck = (id) => {
    setCheckedTasks(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h4 className="mb-3">📝 Today's To-Do List ({today})</h4>
      {todayTasks.length === 0 ? (
        <p className="text-muted">No tasks due today.</p>
      ) : (
        <ul className="list-group">
          {todayTasks.map(task => (
            <li key={task.id} className="list-group-item d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={checkedTasks.includes(task.id)}
                onChange={() => handleCheck(task.id)}
              />
              <div>
                <strong className={checkedTasks.includes(task.id) ? "text-decoration-line-through" : ""}>
                  {task.title}
                </strong>{" "}
                <span className="text-muted small">({task.status})</span>
                <div className="text-muted small">{task.description}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoToday;