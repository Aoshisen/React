import { Route, Switch } from "react-router-dom";
//路由组件的基础应用
import Nav from "./components/nav.js";
import { Fragment } from "react";
import IndexView from "./pages/home";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";
import Page404 from "./pages/page404";
export default function App() {
  return (
    <Fragment>
      <Nav />
      <Switch>
        {/* 
        默认的匹配规则是模糊匹配 
        比模糊匹配更严格的匹配规则是精确匹配 精确匹配 exact  /join/和/join 也能匹配成功
        比精确匹配更严格的匹配规则是严格匹配 注意设置严格匹配strict的时候不能直接设置，是需要先设置exact
        多路径匹配 path定义一个数组，数组里面是可以访问该页面的路径，这里的数组要定义成插值的形式
        当path为空或者是没有path属性时，该Route代表所有路径都匹配
        */}

        <Route path={["/", "/home", "/index"]} component={IndexView} exact />
        <Route path="/user" component={UserPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route component={Page404} />
      </Switch>
    </Fragment>
  );
}
