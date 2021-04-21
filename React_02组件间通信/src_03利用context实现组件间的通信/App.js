import React, { Component } from "react";
import Appson from "./Appson.js";
import { Provider } from "./context.js";
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
    let { name, age } = this.state;
    return (
      <Provider
        value={{
          name,
          age,
          changeAge: this.changeAge,
          changeName: this.changeName,
        }}
      >
        <div className="App">
          {this.state.name}
          {this.state.age}
          <Appson />
        </div>
      </Provider>
    );
  }
}
