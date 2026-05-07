import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5000/api/tasks';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => t._id === id ? response.data : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-top">
            <div>
              <h1 className="title">✨ {user?.name}'s To-Do List</h1>
              <p className="subtitle">Organizing tasks efficiently</p>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/profile')}
            >
              👤 Profile
            </button>
            
          </div>
          
          <div className="stats">
            <div className="stat-card">
              <span className="stat-number">{totalTasks}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card pending">
              <span className="stat-number">{pendingTasks}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card completed">
              <span className="stat-number">{completedTasks}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <TaskForm onAddTask={addTask} />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;