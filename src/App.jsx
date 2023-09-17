import { useState, useEffect } from "react";
import { StyledInput, StyledBtnAdd, StyledTitle, StyledContainer } from "./components/styled";
import { StyledBtnFilters } from "./components/styled";
import { TaskList } from "./components/TaskList";




const TASK_KEY = "tasks";

function generateId() {
  return Math.floor(Math.random() * 1000000);
}



function App() {
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === true) return task.done;
    if (filter === false) return !task.done;
    return true;
  });

  const setTask = (tasks) => {
    const stringifyTask = JSON.stringify(tasks);
    localStorage.setItem(TASK_KEY, stringifyTask);
    setTasks(tasks);
  };
  

  useEffect(() => {
    let tasks = localStorage.getItem(TASK_KEY);
    if (tasks == null) return;
    tasks = JSON.parse(tasks);
    setTask(tasks);
  }, []);

  const handleChangeTask = (id) => () => {
    let editedTasks = tasks.map((task) => {
      if (id === task.id) {
        task.editedTasks = true;
      }
      return task;
    });
    setTask(editedTasks);
  };

  const handelDeleteTask = (id) => () => {
    let updatedTasks = tasks.filter((task) => task.id !== id);
    setTask(updatedTasks);
  };

  const handelCheckTask = (id) => () => {
    let checkTasks = tasks.map((task) => {
      if (id === task.id) {
        task.done = !task.done;
      }
      return task;
    });
    setTask(checkTasks);
  };

  const addBtn = () => {
    let input = document.getElementById("newTask");
    if (input.value === "") return;
    let newTask = {
      text: input.value,
      id: generateId(),
      done: false,
      editing: false,
    };
    setTask([...tasks, newTask]);
    input.value = "";
  };

  const saveBtn = (id, text) => {
    let saveChanges = tasks.map((task) => {
      if (id === task.id && text.length > 0) {
        task.editedTasks = false;
        task.text = text;
      }
      return task;
    });
    setTask(saveChanges);
  };


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
        taskArray={filteredTasks}
        delBtn={handelDeleteTask}
        checkBtn={handelCheckTask}
        changeBtn={handleChangeTask}
        saveBtn={saveBtn}
      ></TaskList>
    </StyledContainer>
  );
}


export default App;
