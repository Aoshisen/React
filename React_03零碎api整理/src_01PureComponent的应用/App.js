import React, { Fragment, PureComponent } from "react";
//在这里说明一下为什么有pureComponent这个东西，因为如果你改变一个渲染在页面上面的元素，在react里面会根据元素里面的值发生改变与否重新渲染视图
//但是如果我们调用了setState方法但是没有改变原来的值的话那么页面是不需要刷新的，所以React提供了一个具有浅对比的Component，叫做PureComponent
export default class App extends PureComponent {
  state = {
    name: "Ass",
    title: {
      title1: "asdada",
    },
  };
  changeState = () => {
    this.setState({
      name: "Ass",
    });
  };
  render() {
    let changeState = this.changeState;
    let name = this.state.name;
    console.log("执行了这个函数");
    let title = this.state.title;
    return (
      <Fragment>
        <div>{name}</div>
        <button onClick={changeState}>点击按钮改变state和之前一样</button>
        {/* 
        如果改变的是一个对象的话那么要让这个pureComponent发生改变的话就要这样使用
        */}
        <button
          onClick={() => {
            title.title1 = "Ass";
            this.setState({
              title: { ...title },
              //这里要返回一个新的引用这样的话才会重新渲染组件
            });
          }}
        >
          这个是对象形式的改变
        </button>
      </Fragment>
    );
  }
}
