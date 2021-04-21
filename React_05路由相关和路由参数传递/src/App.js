import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/nav.js";
import { Fragment, useState } from "react";
import IndexView from "./pages/home";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";
import Page404 from "./pages/page404";
import MessagePage from "./pages/message";
export default function App() {
  let [name, setName] = useState("");
  return (
    <Fragment>
      <Nav />
      <Switch>
        <Route path={["/", "/home", "/index"]} component={IndexView} exact />
        {/* <Route path="/user" component={UserPage} exact /> */}
        {/* 如果需要传递一个参数给一个组件，利用component这个方式是不行的，那么就需要用到render这个方法 */}

        {/* 路由参数
        被 Route组件调用的组件，我们称之为路由组件
        Route在调用组件的时候会传递一些相关联的路由信息
           history:
        go: ƒ go(n) 历史记录跳转几项 正值向前跳转（就是下一步）,负值向后跳转（就是上一步）
        goBack: ƒ goBack() 返回到上一步
        goForward: ƒ goForward() 前进到下一步
        length: 16 历史记录共几项
        location: {pathname: "/", search: "", hash: "", state: undefined, key: "6me149"} 
        location: url 信息，path 当前url,search:当前search,hash:当前hash,state：历史记录传递的信息
        push: ƒ push(path, state) 跳转
        replace: ƒ replace(path, state) 跳转
        __proto__: Object

        location: {pathname: "/", search: "", hash: "", state: undefined, key: "6me149"}
        match: {path: "/", url: "/", isExact: true, params: {…}}
        match:匹配信息，path 当前的path， params：path传递的参数
        staticContext: undefined
        */}
        <Route
          path="/user"
          exact
          render={() => {
            if (name) {
              return <UserPage name={name} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        {/* 使用render函数渲染的组件路由参数在render方法的参数里 */}
        {/* 我们来看一下对于login组件的子组件如果还需要使用到路由参数那么怎么获取？？ */}
        <Route
          path="/login"
          exact
          render={(routeProps) => (
            <LoginPage setName={setName} {...routeProps} />
          )}
        />
        <Route path="/message" component={MessagePage} exact />
        {/* 使用component渲染的组件，路由参数在函数的props中 */}
        <Route component={Page404} />
      </Switch>
    </Fragment>
  );
}
