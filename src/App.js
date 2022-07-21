import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Tasks from "./components/Tasks";

function App() {
  const [showFormTask, setShowFormTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();

      setTasks(data);
    };

    fetchTasks();
  }, []);

  const saveTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    console.log('delete ' + id);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    console.log("toggle" + id);
    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder: !task.reminder} :
      task
    ));
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
