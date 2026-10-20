import { useState } from "react";

export function taskManager() {
  const {tasks, setTasks} = useState([
    {id: 1, label: 'Implementasi halaman register', isChecked: true}
  ])

  const [inputLabel, setInputLabel] = useState('');
  const [activeFilter, setActiveFilter] = useState(0);

  const handleAddTask = (e)=> {
    e.preventDefault();
    if (!inputLabel.trim()) return;

    const newTask = {
      id: Date.now(),
      name: inputLabel,
      isChecked: false
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputLabel('')
  }

  const handleToggleTask = ()=> {
    setTasks((prevTasks)=>{
      prevTasks.map((task)=>{
        task.id ===id
        ? {...task, isChecked: !task.isChecked}
        : task
      });
    });
  }

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task)=> task.id !== id));
  }

  const totalTasks = tasks.length;
  const activeTasks = 
    tasks.filter((task)=>!task.isChecked).length;
  const doneTasks =
    tasks.filter((task)=> task.isChecked).length;

  const filteredTasks = tasks.filter((task)=>{
    if (activeFilter === 1) return !task.isChecked;
    if (activeFilter === 2) return task.isChecked;
  })

  return{
    inputLabel,
    setInputLabel,
    activeFilter,
    setActiveFilter,
    filteredTasks,
    totalTasks,
    activeTasks,
    doneTasks,
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
  };
}

