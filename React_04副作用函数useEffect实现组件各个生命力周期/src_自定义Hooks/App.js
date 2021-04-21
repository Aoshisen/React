import { Fragment, useState, useEffect } from "react";
function useScrollY() {
  let [scrollY, setScrollY] = useState(window.scrollY);
  useEffect(() => {
    return () => {
      window.onscroll = null;
    };
  }, []);
  return [
    scrollY,
    (newScrollY) => {
      window.scrollTo(0, newScrollY); //页面的滚动效果实现
      setScrollY(newScrollY); //本地的state的状态发生改变
    },
  ];
}

//自定义hooks
export default function App() {
  let [scrollY, setScrollY] = useScrollY();
  window.onscroll = () => {
    setScrollY(window.scrollY);
  };
  console.log(scrollY);
  return (
    <Fragment>
      <style>
        {`
          div {
            
            width:200px;
            height:200px;
            font:100px/200px "宋体";
            text-align:center;
            border:1px solid #000;
            margin:10px auto;

          }
          #root{
            border:none;
          }
          span {
            width:50px;
            height:20px;
            position:absolute;
            backgroundcolor:black;
            font:12px/20px "宋体";
            background:black;
            color:white;
            top:200px;
            right:20px;
          }
          `}
      </style>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span
        style={{
          top: 200 + scrollY + "px",
        }}
        onClick={() => {
          setScrollY(0);
        }}
      >
        {scrollY}
      </span>
    </Fragment>
  );
}
