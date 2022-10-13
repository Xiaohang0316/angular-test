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
### 路由顺序

 `Router` 在匹配路由时使用“先到先得”策略。首先列出静态路径的路由，然后是一个与默认路由匹配的空路径路由。[通配符路由](https://angular.cn/guide/router#setting-up-wildcard-routes)是最后一个，因为它匹配每一个 URL，只有当其它路由都没有匹配时，`Router` 才会选择它。

```ts
const routes: Routes = [
  { path: '', component: Test3Component },
  { path: 'cc', component: TestComponent, canActivate: [RouterguardGuard] },//路由守卫
  { path: '**', component: Test2Component },//path 为 ** 的最后一条路由是通配符路由。如果请求的 URL 与前面列出的路径不匹配，路由器会选择这个路由
];
```

### 跳转方式 
```
<span routerLink='cc'> Test 1</span>
把要添加路由的链接赋值给 routerLink 属性。将属性的值设置为该组件，以便在用户点击各个链接时显示这个值。接下来，修改组件模板以包含 <router-outlet> 标签。该元素会通知 Angular，你可以用所选路由的组件更新应用的视图。




constructor(private router: Router) {}

toAComponent() {
    this.router.navigate(['/common/a']);
}
```


### Router API

用于确定是否可以激活路由，所有的守卫都返回true，导航继续。如果有任何守卫返回false，则导航被取消，

CanActivate/CanActiveChild：处理导航到某路由的情况
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
export class DemoGuard1 implements CanActivate {
  // 当用户不满足这个守卫的要求时就不能到达指定路由。
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    ...
    return true;
  }
}




// CanDeactivate：处理从当前路由离开的情况
// 如果不满足这个守卫的要求就不能离开该路由。
export class DemoGuard2 implements CanDeactivate<AComponent> {
 canDeactivate(component: AComponent): boolean {
   // 根据 component 的信息进行具体操作
   retturn true;
 }
}


// Resolve：在路由激活之前获取路由数据
在进入路由时就可以立刻把数据呈现给用户。

@Injectable()
export AResolve implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     const id = route.paramMap.get('id');
     // 可以根据路由中的信息进行相关操作
  }
}
// 最后，需要将路由守卫添加到路由配置中：

const appRoutes: Routes = [
  { 
    path: 'common/a', 
    component: AComponent,
    canActivate: [DemoGurad1],
    canDeactivate: [DemoGuard2],
    resolve: {data: AResolve}
   },
  { path: 'common/b/:id', component: BComponent },
  { path: '**', component: NotFoundComponent}, // 定义通配符路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  ...
})
```











































<!-- 
### Hash模式

vue-router默认使用Hash模式.使用url的hash来模拟一个完整的url.`此时url变化时,浏览器是不会重新加载的.`Hash(即#)是url的锚点,代表的是网页中的一个位置,仅仅改变#后面部分,浏览器只会滚动对应的位置,而不会重新加载页面.`#仅仅只是对浏览器进行指导,而对服务端是完全没有作用的!它不会被包括在http请求中,故也不会重新加载页面.`同时**hash发生变化时,url都会被浏览器记录下来,这样你就可以使用浏览器的后退了.**

<font color=red>总而言之:Hash模式就是通过改变#后面的值,实现浏览器渲染指定的组件.</font>

### History模式

如果你不喜欢hash这种#样式.可以使用history模式.这种模式利用了HTML5 History新增的**pushState()和replaceState()方法.** 除了之前的back,forward,go方法,这两个新方法可以应用在浏览器历史记录的增加替换功能上.使用History模式,通过历史记录修改url,但它不会立即向后端发送请求. **`注意点:`** 虽然History模式可以丢掉不美观的#,也可以正常的前进后退,但是刷新f5后,此时浏览器就会访问服务器,在没有后台支持的情况下,此时就会得到一个404!官方文档给出的描述是:"不过这种模式要玩好,还需要后台配置支持.因为我们的应用是单个客户端应用,如果后台没有正确的配置,当用户直接访问时,就会返回404.所以呢,你要在服务端增加一个覆盖所有情况的的候选资源;如果url匹配不到任何静态资源,则应该返回同一个index.html页面."

<font color=red>总而言之:History模式就是通过pushState()方法来对浏览器的浏览记录进行修改,来达到不用请求后端来渲染的效果.不过建议,实际项目还是使用history模式.</font>
 -->






