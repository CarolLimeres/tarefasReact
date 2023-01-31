import "./index.css";
import React, { useEffect, useState } from "react";
function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}
      <button style={{ background: "red" }} onClick={() => removeTask(index)}>
        x
      </button>

      <button onClick={() => completeTask(index)}>Terminar</button>
    </div>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Criar nova tarefa"
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </form>
  );
}
//construtor do componente
function Tarefas() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
    { title: "Exercícios de HTML", completed: true },
    { title: "Exercícios de Css", completed: false },
    { title: "Exercícios de Javascript", completed: false },
  ]);
  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  });
  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };
  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };
  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="todo-container">
      <div className="header">Lista de Tarefas ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            key={index}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask}></CreateTask>
      </div>
    </div>
  );
}
export default Tarefas;
