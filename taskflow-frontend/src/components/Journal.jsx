import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Journal.css"; // Optional for animations

function Journal() {
  const [entry, setEntry] = useState("");
  const [hoursStudied, setHoursStudied] = useState("");
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5253/api/JournalEntries");
      setEntries(res.data.reverse());
    } catch (err) {
      console.error("Failed to load entries:", err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5253/api/JournalEntries", {
        content: entry,
        hoursStudied: parseFloat(hoursStudied),
        date: new Date().toISOString(),
      });
      setEntry("");
      setHoursStudied("");
      setSaved(true);
      fetchEntries();
    } catch (err) {
      console.error("Failed to save journal:", err);
    }
  };

  const handleEdit = async (entry) => {
    const newContent = prompt("Edit your entry:", entry.content);
    const newHours = prompt("Edit hours studied:", entry.hoursStudied);
    if (newContent !== null && newHours !== null) {
      try {
        await axios.put(`http://localhost:5253/api/JournalEntries/${entry.id}`, {
          ...entry,
          content: newContent,
          hoursStudied: parseFloat(newHours),
        });
        fetchEntries();
      } catch (err) {
        console.error("Failed to update entry:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this journal entry?")) {
      try {
        await axios.delete(`http://localhost:5253/api/JournalEntries/${id}`);
        fetchEntries();
      } catch (err) {
        console.error("Failed to delete entry:", err);
      }
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const getStartOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  };

  const getStartOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    if (filter === "week") return entryDate >= getStartOfWeek();
    if (filter === "month") return entryDate >= getStartOfMonth();
    return true;
  });

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div>
      <h4 className="mb-3">📔 Journal Entry for Today</h4>

      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="What did you accomplish today?"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="number"
        placeholder="Hours Studied"
        value={hoursStudied}
        onChange={(e) => setHoursStudied(e.target.value)}
      />

      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-success" onClick={handleSave}>
          Save Entry
        </button>
        <button className="btn btn-outline-secondary" onClick={() => setShowModal(true)}>
          View Entries
        </button>
      </div>

      {saved && <p className="mt-3 text-success">✔ Entry saved</p>}

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📚 Journal Entries</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
                <div className="mb-3">
                  <div className="btn-group" role="group">
                    <button className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
                    <button className={`btn btn-outline-primary ${filter === "week" ? "active" : ""}`} onClick={() => setFilter("week")}>This Week</button>
                    <button className={`btn btn-outline-primary ${filter === "month" ? "active" : ""}`} onClick={() => setFilter("month")}>This Month</button>
                  </div>
                </div>

                {filteredEntries.length === 0 ? (
                  <p className="text-muted">No entries for selected filter.</p>
                ) : (
                  <ul className="list-group">
                    {filteredEntries.map((e) => (
                      <li key={e.id} className="list-group-item">
                        <div onClick={() => toggleExpand(e.id)} style={{ cursor: "pointer" }}>
                          <strong>{new Date(e.date).toLocaleDateString()}</strong>
                          <span className="text-muted small ms-2">🕒 {e.hoursStudied} hrs studied</span>
                        </div>

                        {expandedId === e.id && (
                          <div className="mt-2">
                            <div className="mb-2">{e.content || <span className="text-muted">No description</span>}</div>
                            <div className="text-end">
                              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(e)}>✏️ Edit</button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(e.id)}>🗑 Delete</button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Journal;