//如果组件是类式组件 就通过withRouter包裹一下

/* import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Son extends Component {
  render() {
    console.log(this.props);
    return <div>This is Son</div>;
  }
}
x
export default Son; */

//如果是函数式组件，可以使用相关的Hooks来拿到相关的参数
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
} from "react-router-dom";

export default function Son() {
  let history = useHistory();
  let match = useRouteMatch();
  let params = useParams();
  let location = useLocation();
  console.log(history, match, params, location);
  return <div> This is Son</div>;
}
