import { TaskEditor } from "./TaskEditor";
import { StyledBtnChange,StyledList, StyledBtnDelete} from "./styled";

export function TaskList(props) {
    return (
      <StyledList>
        {props.array.map((task, index) => (
          <li key={index}>
            <input
              checked={task.done}
              onChange={props.checkBtn(task.id)}
              type="checkbox"
            />
            <TaskEditor task={task} saveBtn={props.saveBtn}></TaskEditor>
            <div>
            <StyledBtnChange onClick={props.changeBtn(task.id)}>Change</StyledBtnChange>
            <StyledBtnDelete onClick={props.delBtn(task.id)}>Delete</StyledBtnDelete>
            </div>
          </li>
        ))}
      </StyledList>
    );
  }



