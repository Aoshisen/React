import React, { Component, Fragment } from "react";
//组件间通信
export default class App extends Component {
  static getDerivedStateFromProps(props) {
    console.log(0, "组件开始获取新的props,并将props绑定在state中");
    return undefined;
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.state,nextState);
    console.log(1, "判断组件是否进行更新");
    //这个方法必须有返回值，返回值的类型为bool值，true则继续执行后面的生命周期，为false则终止组件更新，后续生命周期不被调用
    return true;
  }
  getSnapshotBeforeUpdate() {
    console.log(3, "组件即将更新完成，更新真实DOM，在这里拿到更新前的DOM快照");
    return document.querySelector("#add").innerHTML;
    //返回值会传递给componentDidUpdate的第三个参数；
  }
  componentDidUpdate(prevProps, prevState, prevDOM) {
    console.log(
      4,
      "组件更新完成，state，props皆已更新",
      prevProps,
      prevState,
      prevDOM
    );
    console.log(this.state);
  }
  state = {
    age: 11,
  };
  addAge = () => {
    let age = this.state.age;
    this.setState({
      age: ++age,
    });
  };
  render() {
    console.log("重新生成虚拟DOM,准备组件更新");
    let age = this.state.age;
    let addAge = this.addAge;
    return (
      <Fragment>
        <p id="add">{age}</p>
        <button onClick={addAge}>长大一岁</button>
      </Fragment>
    );
  }
}
