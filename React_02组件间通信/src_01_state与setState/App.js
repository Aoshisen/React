import React, { Component, Fragment } from "react";

export default class App extends Component {
  state = {
    name: "kkb",
    age: 1,
  };
  // setState(updater, [callback])
  changeName = () => {
    this.setState({ name: "Ass" });
    console.log(this); // 如果使用普通函数的话那么this指向为undefined，所以我们使用箭头函数来初始化this指向为App
  };
  changeAge = () => {
    this.setState({
      age: 22,
    });
  };

  render() {
    return (
      <Fragment>
        <div>{this.state.name}</div>
        <button onClick={this.changeName}>changeName</button>
        {/* 这个时候我们可以看见点击了button页面由于数据的更改重新渲染了视图 */}
        <div>{this.state.age}</div>
        <button onClick={this.changeAge}>changeAge</button>
      </Fragment>
    );
  }
}
// {
//   /*
// 注意：
// ## this.setState(obj||fn,[callback]),callback是完成后的回调函数
//      object:修改对象里面的值，setState会自动调用合并obj的状态
//     fn：执行setState的时候会执行fn,fn函数必须返回一个对象，对象里面存储我们想要修改的状态
// ## 修改state会调用render方法重新渲染视图
// ## 在使用setState时，要注意setState是一个异步方法，如果在setState时去获取state的值，拿到的还是之前的值
// ## 多个setState同时执行，会被合并执行，执行一次render
// */
// }
