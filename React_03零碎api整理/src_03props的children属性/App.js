import React, { Component } from "react";
import PopWin from "./popWin";
class App extends Component {
  render() {
    //组件渲染完成后让组件获得焦点的需求
    return (
      <PopWin title={"这是父级传递的title"}>
        <div>这是内容</div>
        <div>这是内容</div>
      </PopWin>
    );
  }
}
export default App;
