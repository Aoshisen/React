import React, { Component, Fragment } from "react";

//受控组件
class App extends Component {
  state = {
    name: "小名",
    isChecked: false,
  };
  render() {
    let { name, isChecked } = this.state;
    return (
      <Fragment>
        <input
          placeholder="请输入昵称"
          value={name}
          type="text"
          onChange={({ target }) => {
            this.setState({
              name: target.value,
            });
            // let { target } = props;
            // console.log(props);
          }}
        ></input>
        <span> {name}</span>
        {/* //这里就形成了一个受控组件 */}
        {/* 非受控组件就是把value变成defaultValue，然后onChange时不去改变他的状态就可以了，变成了一个非受控组件 */}
        <br />
        <input
          type="checkbox"
          checked={isChecked}
          onChange={({ target }) => {
            this.setState({
              isChecked: target.checked,
            });
          }}
        />
        是否愿意学习
        <span>{isChecked ? "是" : "否"}</span>
        <br />
        <button>提交</button>
      </Fragment>
    );
  }
}

export default App;
