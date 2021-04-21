import React, { Component } from "react";
//组件间通信
export default class AppSon extends Component {
  state = {
    name: "App",
    age: 23,
  };
  logData = () => {
    console.log(this.props);
  };
  render(...props) {
    return (
      <div>
        <button onClick={this.props.changeAge}>Button</button>
      </div>
    );
  }
}
