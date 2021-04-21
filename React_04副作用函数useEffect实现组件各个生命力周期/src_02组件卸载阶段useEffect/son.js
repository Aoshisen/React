import { useEffect } from "react";

export default function Son() {
  useEffect(() => {
    console.log("挂载完成");
    return () => {
      console.log("卸载完成");
    };
  }, []);
  return <div>This is Son</div>;
}
