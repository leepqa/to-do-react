import { TaskEditor } from "./TaskEditor";
import { StyledBtn,StyledList } from "./styled";

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
            <StyledBtn onClick={props.changeBtn(task.id)}>Change</StyledBtn>
            <StyledBtn onClick={props.delBtn(task.id)}>Delete</StyledBtn>
            <TaskEditor task={task} saveBtn={props.saveBtn}></TaskEditor>
          </li>
        ))}
      </StyledList>
    );
  }



