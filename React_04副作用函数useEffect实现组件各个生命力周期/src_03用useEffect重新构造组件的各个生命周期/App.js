// 我们用useRef存储值不变的特性来重新构造一下组件的各个生命周期;
import { useEffect, Fragment, useState, useRef } from "react";
export default function App() {
  let [age, setAge] = useState(0);
  let initAge = useRef(age);
  let prevAge = useRef(age);
  let addAge = () => {
    setAge(++age);
  };

  //挂载阶段
  useEffect(() => {
    console.log("组件挂载完成");
  }, []);
  //挂载和更新阶段
  useEffect(() => {
    console.log(prevAge.current);
    console.log(age);
    //需要手动给previousCount更新值
    prevAge.current = age;
  });
  useEffect(() => {
    //没有第二个参数的时候就是挂载和更新阶段
    //我们利用createRef存储值来达到判定是不是挂载阶段使用这个方法的时候需要注意的是current
    if (initAge.current === prevAge.current) {
      console.log("挂载阶段");
    } else {
      console.log("更新阶段");
    }
  });
  return (
    <Fragment>
      <div>{age}</div>
      <button onClick={addAge}>长大一岁</button>
    </Fragment>
  );
}
