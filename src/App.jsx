import { useState, useEffect } from "react";
import { StyledInput, StyledBtnAdd, StyledTitle, StyledContainer } from "./components/styled";
import { StyledBtnFilters } from "./components/styled";
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
    <StyledContainer>
      <StyledTitle>Todo List</StyledTitle>
      <StyledInput id="newTask"></StyledInput>
      <StyledBtnAdd onClick={addBtn}>Add</StyledBtnAdd>
      <div>
        <StyledBtnFilters onClick={() => setFilter(null)}>All</StyledBtnFilters>
        <StyledBtnFilters onClick={() => setFilter(true)}>Complete</StyledBtnFilters>
        <StyledBtnFilters onClick={() => setFilter(false)}>Pending</StyledBtnFilters>
      </div>
      <TaskList
        array={filterTasks}
        delBtn={delBtn}
        checkBtn={checkBtn}
        changeBtn={changeBtn}
        saveBtn={saveBtn}
      ></TaskList>
    </StyledContainer>
  );
}


export default App;
