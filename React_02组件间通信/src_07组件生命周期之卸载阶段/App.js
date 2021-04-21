import React, { Component, Fragment } from "react";
import Children from "./children";
class App extends Component {
  state = {
    isShow: true,
  };

  render() {
    let { isShow } = this.state;
    return (
      <Fragment>
        {isShow ? <Children /> : ""}
        <button
          onClick={() => {
            this.setState({ isShow: !isShow });
          }}
        >
          显示隐藏
        </button>
      </Fragment>
    );
  }
}

export default App;
