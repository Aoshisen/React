/* import React, { Component } from "react";
import { Consumer } from "./context.js";
//组件间通信
export default class AppSon extends Component {
  state = {
    name: "App",
    age: 23,
  };
  render() {
    return (
      <Consumer>
      //Consumer 里面会包含一个插值，插值里面是一个函数返回的值就是需要渲染的最终的vDom
        {(context) => {
          let { name, changeName } = context;
          return (
            <div>
              <button onClick={changeName}>Button{name}</button>
            </div>
          );
        }}
      </Consumer>
    );
  }
} */

//第二种引用数据的方法
import React, { Component } from "react";
import ctx from "./context.js";
export default class Appson extends Component {
  // 这里是值得注意的一点
  static contextType = ctx;
  render() {
    let { name, changeName } = this.context;
    return (
      <div>
        <button onClick={changeName}>Button{name}</button>
      </div>
    );
  }
}
//这个方法不推荐在实际的开发环境中使用，这些方法是第三方库使用的方法
