import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios.get("http://localhost:5253/api/Tasks")
      .then(res => {
        const mappedEvents = res.data.map(task => ({
          id: task.id,
          title: task.title,
          start: new Date(task.dueDate),
          end: new Date(task.dueDate),
          allDay: true,
        }));
        setEvents(mappedEvents);
        setTasks(res.data);
      })
      .catch(err => console.error("Failed to fetch tasks:", err));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const tasksForDate = tasks.filter(
    (task) => formatDate(task.dueDate) === formatDate(selectedDate)
  );

  return (
    <div>
      <h4 className="mb-3">Task Calendar</h4>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={(slotInfo) => setSelectedDate(slotInfo.start)}
        selectable
      />

      <h5 className="mt-4">Tasks on {formatDate(selectedDate)}:</h5>
      {tasksForDate.length > 0 ? (
        <ul className="list-group">
          {tasksForDate.map((task) => (
            <li key={task.id} className="list-group-item">
              <strong>{task.title}</strong> - {task.status}
              <div className="text-muted small">{task.description}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No tasks for this day.</p>
      )}
    </div>
  );
}

export default CalendarView;
