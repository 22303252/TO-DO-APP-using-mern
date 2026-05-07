import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState(''); // NEW: Time state

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate title
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    // Combine date and time into a single datetime
    let fullDueDate = null;
    if (dueDate) {
      if (dueTime) {
        // If both date and time are provided
        fullDueDate = new Date(`${dueDate}T${dueTime}`);
      } else {
        // If only date is provided, set time to end of day
        fullDueDate = new Date(`${dueDate}T23:59:59`);
      }
    }

    // Send task data to parent component
    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: fullDueDate
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setDueTime('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <textarea
          className="input textarea"
          placeholder="Add description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      {/* Date and Time Pickers Row */}
      <div className="form-group">
        <label className="input-label">📅 Deadline (Optional)</label>
        <div className="datetime-row">
          <input
            type="date"
            className="input date-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          <input
            type="time"
            className="input time-input"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            disabled={!dueDate}
            placeholder="Time (optional)"
          />
        </div>
        {dueDate && !dueTime && (
          <p className="helper-text">⏰ No time set - defaults to end of day (11:59 PM)</p>
        )}
      </div>

      <div className="form-row">
        <select 
          className="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;