import Son from "./son.js";
import { useState, Fragment } from "react";
// 组件的卸载是怎么样进行的;
export default function App() {
  let [isShow, changShow] = useState(true);
  return (
    <Fragment>
      {isShow ? <Son /> : ""}
      <button
        onClick={() => {
          changShow(!isShow);
        }}
      >
        切换显示隐藏
      </button>
    </Fragment>
  );
}
