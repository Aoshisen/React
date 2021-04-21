import { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions/index";

export default function AddToDo() {
  let inputBox = useRef();
  let dispatch = useDispatch();
  let [text, setText] = useState("");
  return (
    <Fragment>
      <input
        ref={inputBox}
        onChange={({ target }) => {
          setText(target.value);
        }}
        onKeyDown={({ keyCode }) => {
          if (keyCode === 13) {
            if (text) {
              inputBox.current.value = "";
              dispatch(addTodo(text));
              setText("");
            } else {
              alert("请输入一个完整的Todo");
            }
          }
        }}
      />
      <button
        onClick={() => {
          if (text) {
            inputBox.current.value = "";
            dispatch(addTodo(text));
            setText("");
          } else {
            alert("请输入一个完整的Todo");
          }
        }}
      >
        添加ToDo
      </button>
    </Fragment>
  );
}
