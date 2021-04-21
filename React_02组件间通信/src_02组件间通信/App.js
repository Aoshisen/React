import React, { Component } from "react";
import Appson from "./Appson.js";
//组件间通信
export default class App extends Component {
  changeName = (newName) => {
    this.setState({
      name: "newName",
    });
  };
  changeAge = () => {
    this.setState({
      age: "newAge",
    });
  };
  state = {
    name: "Ass",
    age: 23,
  };
  render() {
    return (
      <div className="App">
        {this.state.name}
        {this.state.age}
        <Appson
          changeAge={this.changeAge}
          changeName={this.changeName}
          state={this.state}
        />
      </div>
    );
  }
}
