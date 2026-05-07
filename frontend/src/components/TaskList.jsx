import React from 'react';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Add your first task to get started!</p>
      </div>
    );
  }

  // Get priority emoji
  const getPriorityEmoji = (priority) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  // Format created date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format due date with time - ENHANCED VERSION
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const dueDate = new Date(dateString);
    const now = new Date();
    
    const diffTime = dueDate - now;
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Format time
    const timeStr = dueDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    // Format date
    const dateStr = dueDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Determine status and message
    if (diffTime < 0) {
      const hoursOverdue = Math.abs(diffHours);
      const daysOverdue = Math.abs(diffDays);
      
      if (hoursOverdue < 24) {
        return { 
          text: `Overdue by ${hoursOverdue}h`, 
          fullText: `${dateStr} at ${timeStr}`,
          status: 'overdue' 
        };
      } else {
        return { 
          text: `Overdue by ${daysOverdue}d`, 
          fullText: `${dateStr} at ${timeStr}`,
          status: 'overdue' 
        };
      }
    } else if (diffHours < 1) {
      const minutes = Math.floor(diffTime / (1000 * 60));
      return { 
        text: `Due in ${minutes} min`, 
        fullText: `Today at ${timeStr}`,
        status: 'urgent' 
      };
    } else if (diffHours < 24) {
      return { 
        text: `Due in ${diffHours}h`, 
        fullText: `Today at ${timeStr}`,
        status: 'today' 
      };
    } else if (diffDays === 1) {
      return { 
        text: 'Due Tomorrow', 
        fullText: `Tomorrow at ${timeStr}`,
        status: 'tomorrow' 
      };
    } else if (diffDays < 7) {
      return { 
        text: `Due in ${diffDays} days`, 
        fullText: `${dateStr} at ${timeStr}`,
        status: 'upcoming' 
      };
    } else {
      return { 
        text: `Due ${dateStr}`, 
        fullText: `${dateStr} at ${timeStr}`,
        status: 'future' 
      };
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task) => {
        const dueDateInfo = formatDueDate(task.dueDate);
        
        return (
          <div 
            key={task._id} 
            className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}
          >
            <div className="task-content">
              {/* Checkbox */}
              <input
                type="checkbox"
                className="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task._id)}
              />

              {/* Task Info */}
              <div className="task-info">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                <div className="task-meta">
                  <span className="priority-badge">
                    {getPriorityEmoji(task.priority)} {task.priority}
                  </span>
                  
                  {/* Due Date Badge with Time */}
                  {dueDateInfo && (
                    <span 
                      className={`due-date-badge ${dueDateInfo.status}`}
                      title={dueDateInfo.fullText}
                    >
                      📅 {dueDateInfo.text}
                    </span>
                  )}
                  
                  <span className="task-date">Created: {formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <button 
              className="btn-delete"
              onClick={() => onDeleteTask(task._id)}
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;