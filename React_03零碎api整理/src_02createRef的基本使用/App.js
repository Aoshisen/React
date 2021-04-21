import React, { Component, createRef, Fragment } from "react";
class App extends Component {
  input = createRef();
  //如果要获取多个节点那么就可以创建多个ref，然后在组件中进行绑定；然后在需要时候获取就行了
  // 用ref关联DOM节点的时候，直接绑定，如果DOM有修改，那么React会同步ref的值
  p = createRef();

  //在挂载完成之后或者更新完就可以获取到这个节点了
  componentDidMount() {
    // console.log(this.input.current)
    console.log(this.p);
    this.input.current.focus();
  }
  render() {
    //组件渲染完成后让组件获得焦点的需求
    return (
      <Fragment>
        <input ref={this.input} />
        <p ref={this.p}>这是一个P标签</p>
      </Fragment>
    );
  }
}
export default App;
