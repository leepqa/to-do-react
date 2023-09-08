import { useState, useEffect } from "react";
// import { StyledBtn,StyledList } from "./components/styled";
import { TaskList } from "./components/TaskList";

const TASKS_STORAGE = "tasks";




function App() {
  const [tasks, setTasksState] = useState([]);
  const [filter, setFilter] = useState(null);
  const filterTasks = tasks.filter((task) => {
    if (filter === true) return task.done;
    if (filter === false) return !task.done;
    return true;
  });

  const setTasks = (tasks) => {
    const stringifyTask = JSON.stringify(tasks);
    localStorage.setItem(TASKS_STORAGE, stringifyTask);
    setTasksState(tasks);
  };

  useEffect(() => {
    let tasks = localStorage.getItem(TASKS_STORAGE);
    if (tasks == null) return;
    tasks = JSON.parse(tasks);
    setTasks(tasks);
  }, []);

  const changeBtn = (id) => () => {
    let editing = tasks.map((task) => {
      if (id === task.id) {
        task.editing = true;
      }
      return task;
    });
    setTasks(editing);
  };

  const delBtn = (id) => () => {
    let updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };
  const checkBtn = (id) => () => {
    let checkdone = tasks.map((task) => {
      if (id === task.id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(checkdone);
  };

  const addBtn = () => {
    let input = document.getElementById("newTask");
    if (input.value === "") return;
    let newTask = {
      text: input.value,
      id: generateID(),
      done: false,
      editing: false,
    };
    setTasks([...tasks, newTask]);
    input.value = "";
  };

  const saveBtn = (id, text) => {
    let saveBtn = tasks.map((task) => {
      if (id === task.id && text.length > 0) {
        task.editing = false;
        task.text = text;
      }
      return task;
    });
    setTasks(saveBtn);
  };

  function generateID() {
    return Math.floor(Math.random() * 1000000);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setFilter(null)}>All</button>
        <button onClick={() => setFilter(true)}>Complete</button>
        <button onClick={() => setFilter(false)}>Pending</button>
      </header>
      <input id="newTask"></input>
      <button onClick={addBtn}>Добавить</button>
      <TaskList
        array={filterTasks}
        delBtn={delBtn}
        checkBtn={checkBtn}
        changeBtn={changeBtn}
        saveBtn={saveBtn}
      ></TaskList>
    </div>
  );
}


export default App;
