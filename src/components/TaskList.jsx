import { TaskEditor } from "./TaskEditor";
import { StyledBtnChange, StyledList, StyledBtnDelete } from "./styled";



export function TaskList({ taskArray, checkBtn, saveBtn, changeBtn, delBtn }) {
  
  return (
    <StyledList>
      {taskArray.map((task) => (
        <li key={task.id}>
          <input
            checked={task.done}
            onChange={checkBtn(task.id)}
            type="checkbox"
          />
          <TaskEditor task={task} saveBtn={saveBtn} />
          <div>
            <StyledBtnChange onClick={changeBtn(task.id)}>
              Change
            </StyledBtnChange>
            <StyledBtnDelete onClick={delBtn(task.id)}>
              Delete</StyledBtnDelete>
          </div>
        </li>
      ))}
    </StyledList>
  );
}
