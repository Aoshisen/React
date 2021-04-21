import React from "react";
//不同数据类型在JSX 中的表现形式
/* 
基本类型
- 字符串，数字 原样输出
- boolen null undefined 会被忽略

数组会把“，”去掉然后显示在页面上
对象在大多数情况下无法正常显示

*/
function App() {
  let arr = ["a", "b", "c"];

  let styl = {
    width: 100,
    height: 100,
    border: "1px solid #000",
  };
  let arrEl = arr.map((item) => {
    return <li>{item}</li>;
  });
  return (
    <div className="App">
      {"字符串"}
      {NaN}
      {undefined}
      {true}
      {null}
      {[1, 2, 3]}
      {/* JSX 中的条件渲染 */}
      {/* 可以用三目，可以用&& 也可以用|| */}
      {/* 逻辑复杂的话可以用函数 */}
      {true ? "正确" : "错误"}
      {true && 2} {/*返回2*/}
      {false || 2} {/*返回2*/}
      {/*JSX中的列表渲染*/}
      <ul>{arrEl}</ul>
      <div style={styl}></div>
      <label htmlFor="check">选中</label>
      <input type="checkbox"></input>
    </div>
  );
}

export default App;
