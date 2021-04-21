import React, { Component } from "react";
class PopWin extends Component {
  render() {
    let { title, children } = this.props;
    //在父组件中因为是双标签,中间可以放东西，但是不会渲染，这些节点就被传入到了子级的props的一个属性中，那个属性就是children
    // console.log(this.props.title)
    return (
      <div>
        {title}
        {children}
      </div>
    );
  }
}
export default PopWin;
