import React, { useState } from "react";
import axios from "axios";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title, description, dueDate, status };

    try {
      await axios.post("http://localhost:5253/api/Tasks", newTask);
      onTaskCreated(); // Refresh the task list
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-3">Create New Task</h4>

      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <select
        className="form-control"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
         </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;