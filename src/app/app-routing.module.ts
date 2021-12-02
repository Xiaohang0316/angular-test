import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { RouterguardGuard } from './routerguard.guard';

const routes: Routes = [
  { path: '', component: Test3Component }, 
  // { path: 'cc', component: TestComponent, canActivate: [RouterguardGuard] },
  { path: 'cc', component: TestComponent},
  { path: '**', component: Test2Component },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
