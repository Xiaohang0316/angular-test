### 什么是router

在单页应用中，可以通过显示或隐藏与特定组件相对应的部分来更改用户看到的内容，而不用去服务器获取新页面。用户执行应用程序任务时，他们需要在定义好的不同视图之间移动。

<font color=red>其本质就是:建立并管理url和对应组件之间的映射关系.</font>


### angular router
angular路由实则是吧所有的方法定义成angular自定义指令，并调用指令来实现路由功能

```sh
# 下面的命令会用 Angular CLI 来生成一个带有应用路由模块（AppRoutingModule）的基本 Angular 应用，它是一个 NgModule，可用来配置路由。下面的例子中应用的名字是 routing-app
ng new routing-app --routing --defaults
# 创建一个组件并自动添加到angular Router
ng generate component <component-name>

```

### 路由顺序

 `Router` 在匹配路由时使用“先到先得”策略，所以应该在不那么具体的路由前面放置更具体的路由。首先列出静态路径的路由，然后是一个与默认路由匹配的空路径路由。[通配符路由](https://angular.cn/guide/router#setting-up-wildcard-routes)是最后一个，因为它匹配每一个 URL，只有当其它路由都没有匹配时，`Router` 才会选择它。

```ts
const routes: Routes = [
  { path: '', component: Test3Component },
  { path: 'cc', component: TestComponent, canActivate: [RouterguardGuard] },//路由守卫
  { path: '**', component: Test2Component },//path 为 ** 的最后一条路由是通配符路由。如果请求的 URL 与前面列出的路径不匹配，路由器会选择这个路由
];
```

### Router API

#### ActivatedRoute

#### 路由守卫

用于确定是否可以激活路由，所有的守卫都返回true，导航继续。如果有任何守卫返回false，则导航被取消，

CanActivate				检查路由访问
CanActivateChild	   检查子路由访问
CanDeactivate			在放弃未保存的更改之前请求许可
Resolve						预先获取路由数据
CanLoad					 在加载功能模块的文件之前检查

```sh
ng generate guard <guard-name>
```

```ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterguardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;//权限控制
  }
  
}

```



















```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';

const routes: Routes = [
  { path: '', component: Test3Component },
  { path: 'cc', component: TestComponent },
  { path: '**', component: Test2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//导出的可声明对象可用在当前模块内的模板中。
  exports: [RouterModule],//组件、指令和管道可以在导入了本模块的模块下任何组件的模板中使用。 导出的这些可声明对象就是该模块的公共 API。
})
export class AppRoutingModule {}
```























### Hash模式

vue-router默认使用Hash模式.使用url的hash来模拟一个完整的url.`此时url变化时,浏览器是不会重新加载的.`Hash(即#)是url的锚点,代表的是网页中的一个位置,仅仅改变#后面部分,浏览器只会滚动对应的位置,而不会重新加载页面.`#仅仅只是对浏览器进行指导,而对服务端是完全没有作用的!它不会被包括在http请求中,故也不会重新加载页面.`同时**hash发生变化时,url都会被浏览器记录下来,这样你就可以使用浏览器的后退了.**

<font color=red>总而言之:Hash模式就是通过改变#后面的值,实现浏览器渲染指定的组件.</font>

### History模式

如果你不喜欢hash这种#样式.可以使用history模式.这种模式利用了HTML5 History新增的**pushState()和replaceState()方法.** 除了之前的back,forward,go方法,这两个新方法可以应用在浏览器历史记录的增加替换功能上.使用History模式,通过历史记录修改url,但它不会立即向后端发送请求. **`注意点:`** 虽然History模式可以丢掉不美观的#,也可以正常的前进后退,但是刷新f5后,此时浏览器就会访问服务器,在没有后台支持的情况下,此时就会得到一个404!官方文档给出的描述是:"不过这种模式要玩好,还需要后台配置支持.因为我们的应用是单个客户端应用,如果后台没有正确的配置,当用户直接访问时,就会返回404.所以呢,你要在服务端增加一个覆盖所有情况的的候选资源;如果url匹配不到任何静态资源,则应该返回同一个index.html页面."

<font color=red>总而言之:History模式就是通过pushState()方法来对浏览器的浏览记录进行修改,来达到不用请求后端来渲染的效果.不过建议,实际项目还是使用history模式.</font>



## 这一段暂且搁置

### router,routes,route傻傻分不清?
1, router:一般指的就是路由实例.如$router.
2, routes:指router路由实例的routes API.用来配置多个route路由对象.
3, route:指的就是路由对象.例如;$route指的就是当前路由对象.



