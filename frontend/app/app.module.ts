import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { OneComponent }  from './one.component';
import { TwoComponent }  from './two.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    OneComponent,
    TwoComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
