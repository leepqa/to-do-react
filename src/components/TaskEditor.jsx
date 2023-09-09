import { useState } from "react";
import { StyledBtnSave, StyledInput } from "./styled";


export function TaskEditor(props) {
    const [text, setText] = useState(props.task.text);
  
    return (
      <>
        {props.task.editing ? (
          <>
            <StyledInput
              onChange={(e) => setText(e.target.value)}
              type={"text"}
              value={text}
            ></StyledInput>
            <StyledBtnSave onClick={() => props.saveBtn(props.task.id, text)}>
              Save
            </StyledBtnSave>
          </>
        ) : (
          text
        )}
      </>
    );
  }