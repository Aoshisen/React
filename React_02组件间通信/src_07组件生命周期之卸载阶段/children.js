import React, { Component } from "react";
class Children extends Component {
  componentDidMount() {
    window.onresize = () => {
      // console.log(window.innerHeight);
      let age = document.querySelector("#add");
      console.log(age.innerHTML);
    };
  }
  componentWillUnmount() {
    console.log("组件即将卸载");
    window.onresize = null;
    //这里需要在卸载的阶段清空在全局的方法，比如在窗口打小改变时获取不存在dom的值
  }
  render() {
    return <h1 id="add">这是children</h1>;
  }
}
export default Children;
