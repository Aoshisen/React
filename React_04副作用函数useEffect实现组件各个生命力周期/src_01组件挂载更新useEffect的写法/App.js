//函数式组件利用useEffect实现生命周期的各个阶段
import { useEffect, Fragment, useState } from "react";
// 因为这个组件里面的值都是动态的，每一次重新渲染都会重新定义变量，所以我们要把isMount定义在外面当然这不是一个最好的解决办法
let isMount = false;
function App() {
  let [age, setAge] = useState(0);
  let data = useState("Ass");
  console.log(data);
  let addAge = function () {
    setAge(++age);
  };
  //挂载的时候依赖的是一个空数组
  useEffect(() => {
    console.log("挂载的时候");
  }, []);

  //组件挂载或者是更新的时候是没有第二个参数的
  useEffect(() => {
    if (isMount) {
      console.log("更新阶段");
    }
    isMount = true;
  });
  useEffect(() => {
    console.log("组件挂载和更新阶段");
  });

  useEffect(() => {
    //这个函数在页面开始渲染的时候就会执行一次那么这个函数也需要判定一下是不是初始化阶段，但是这时候并不能用isMount了
    // 因为这个时候isMount已经被挂挂载函数执行了变成了true;
    console.log("依赖的参数更新了");
  }, [age]);

  useState({
    age: 1,
  });

  return (
    <Fragment>
      <div>{age}</div>
      <button onClick={addAge}>长大一岁</button>
    </Fragment>
  );
}

export default App;
