import { useState } from "react";



export function TaskEditor(props) {
    const [text, setText] = useState(props.task.text);
  
    return (
      <>
        {props.task.editing ? (
          <>
            <input
              onChange={(e) => setText(e.target.value)}
              type={"text"}
              value={text}
            ></input>
            <button onClick={() => props.saveBtn(props.task.id, text)}>
              Save
            </button>
          </>
        ) : (
          text
        )}
      </>
    );
  }