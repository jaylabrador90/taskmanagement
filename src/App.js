import React, { useState } from 'react';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [sortType, setSortType] = useState('name');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTaskList([...taskList, { text: newTask, completed: false, added: Date.now() }]);
      setNewTask('');
    }
  };

  const handleCompleteTask = (index) => {
    const newList = [...taskList];
    newList[index].completed = !newList[index].completed;
    setTaskList(newList);

    // Select the task being marked
    setSelectedTask(newList[index]);
  };

  const handleDeleteTask = (index) => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const countIncompleteTasks = () => {
    return taskList.filter((task) => !task.completed).length;
  };

  const countCompletedTasks = () => {
    return taskList.filter((task) => task.completed).length;
  };

  const sortedTaskList = [...taskList].sort((a, b) => {
    if (sortType === 'name') {
      return a.text.localeCompare(b.text);
    } else if (sortType === 'date') {
      return a.added - b.added;
    } else {
      return 0;
    }
  });

  return (
    <div className="container">
      <h1>Task Management</h1>
      <div className="sort" style={{ textAlign: 'right' }}>
        <button onClick={() => handleSort('name')}>Sort by name</button>
        <button onClick={() => handleSort('date')}>Sort by date</button>
      </div>
      <br></br>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="What's your task?.."
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button type="submit">+</button>
      </form>
      <ul>
        {sortedTaskList.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : '' + (selectedTask === task ? 'selected' : '')}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(index)}
              />
              <span className="checkmark"></span>
              <span>{task.completed ? <del>{task.text}</del> : task.text}</span>
            </label>
            <div>
              <button onClick={() => handleDeleteTask(index)}>DEL</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="task-count">
        <span>{countIncompleteTasks()}</span> task{countIncompleteTasks() === 1 ? '' : 's'} unifinished,{' '}
        <span>{countCompletedTasks()}</span> task{countCompletedTasks() === 1 ? '' : 's'} finished
      </div>
    </div>
  );
}

export default App;
