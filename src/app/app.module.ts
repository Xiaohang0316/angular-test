import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { Error404 } from './error404/error404.component';
import { Test3Component } from './test3/test3.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    Error404,
    Test3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
