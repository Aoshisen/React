import { Fragment } from "react";
import Son from "../son.js";
export default function Login(props) {
  /* 因为只有被Route组件调用的组件才是路由组件，那么被普通组件调用的组件就不是路由组件了，那如果我们在这里需要调用的组件需要使用到路由的相关信息，那怎么办呢 */
  let { setName } = props;
  console.log(props);
  return (
    <Fragment>
      <h1>This is Login Page</h1>
      <Son />
      <button
        onClick={() => {
          setName("ASS");
        }}
      >
        登陆
      </button>
    </Fragment>
  );
}
