import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Tasks from "./components/Tasks";

function App() {
  const [showFormTask, setShowFormTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  const saveTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks`, {      
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await response.json();

    setTasks([...tasks, data]);
  }

  const deleteTask = async (id) => {
    console.log('delete ' + id);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }

  return (
    <div className="container">
      <Header 
        showAdd={showFormTask}
        onAdd={() => setShowFormTask(!showFormTask)} />
      {showFormTask && <TaskForm onSave={saveTask} />}
      {tasks.length > 0 ? 
      (
        <Tasks tasks={tasks} 
          onToggle={toggleReminder}
          onDelete={deleteTask} />
      ) : (
        "No tasks to show"
      )}
      
    </div>
  );
}

export default App;
