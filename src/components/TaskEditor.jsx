import { useState } from "react";
import { StyledBtnSave, StyledInput } from "./styled";



export function TaskEditor({task, saveBtn}) {
  const [text, setText] = useState(task.text);

  return (
    <>
      {task.editedTasks ? (
        <>
          <StyledInput
            onChange={(e) => setText(e.target.value)}
            type="text"
            value={text}
          ></StyledInput>
          <StyledBtnSave onClick={() => saveBtn(task.id, text)}>
            Save
          </StyledBtnSave>
        </>
      ) : (
        text
      )}
    </>
  );
}
