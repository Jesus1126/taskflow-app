import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList({ refreshSignal, onTaskUpdated }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [refreshSignal]);

  const fetchTasks = () => {
    axios
      .get("http://localhost:5253/api/Tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5253/api/Tasks/${id}`)
      .then(() => fetchTasks())
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleStatusChange = (id, newStatus) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (!taskToUpdate) return;

    axios
      .put(`http://localhost:5253/api/Tasks/${id}`, { ...taskToUpdate, status: newStatus })
      .then(() => {
        if (onTaskUpdated) onTaskUpdated();
      })
      .catch((err) => console.error("Status update failed:", err));
  };

  return (
    <div>
      <h4 className="mb-3">Task List</h4>
      {tasks.length === 0 ? (
        <div className="text-muted">No tasks yet.</div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{task.title}</strong>
                <div className="text-muted small">{task.description}</div>
              </div>
              <div className="d-flex align-items-center">
                <select
                  className="form-select form-select-sm me-2"
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-sm btn-danger"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;