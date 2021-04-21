import React, { Component, Fragment } from "react";
//组件间通信
export default class App extends Component {
  constructor(props) {
    super(props);
    console.log("0初始化组件");
  }
  static getDerivedStateFromProps(props) {
    console.log("1.将props和state进行关联");
    //这个静态方法返回的是一个对象，这个方法会把返回的对象添加到state中
    return {
      name: "这是新添加的一个state",
    };
  }
  componentDidMount() {
    console.log(3, "组件挂载完成并将虚拟DOM生成真实DOM,添加到DOM树中");
  }
  render() {
    console.log(this.state);
    console.log(2, "创建虚拟DOM");
    return (
      <Fragment>
        <p>{11}</p>
        <button>长大一岁</button>
      </Fragment>
    );
  }
}
