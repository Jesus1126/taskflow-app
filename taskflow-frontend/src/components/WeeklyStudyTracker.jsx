// src/components/WeeklyStudyTracker.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function WeeklyStudyTracker() {
  const [weeklyHours, setWeeklyHours] = useState(0);
  const weeklyGoal = 20; // You can customize this

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const res = await axios.get("http://localhost:5253/api/JournalEntries");
        const entries = res.data;

        const startOfWeek = new Date();
        const day = startOfWeek.getDay(); // Sunday = 0
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Start on Monday
        const weekStart = new Date(startOfWeek.setDate(diff));
        weekStart.setHours(0, 0, 0, 0);

        const total = entries
          .filter((e) => new Date(e.date) >= weekStart)
          .reduce((sum, e) => sum + (e.hoursStudied || 0), 0);

        setWeeklyHours(total);
      } catch (err) {
        console.error("Failed to fetch journal entries:", err);
      }
    };

    fetchJournalEntries();
  }, []);

  const percent = Math.min((weeklyHours / weeklyGoal) * 100, 100);

  return (
    <div className="mt-5">
      <h4 className="mb-2">📈 Weekly Study Progress</h4>
      <div className="progress" style={{ height: "25px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={weeklyHours}
          aria-valuemin="0"
          aria-valuemax={weeklyGoal}
        >
          {weeklyHours} / {weeklyGoal} hrs
        </div>
      </div>
    </div>
  );
}

export default WeeklyStudyTracker;