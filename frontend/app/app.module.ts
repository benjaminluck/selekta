import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { ViewSelectionComponent }  from './view-selection.component';
import { DashboardComponent }  from './dashboard.component';

import { AppRoutingModule } from './app-routing.module';

import { KeysPipe } from './keys.pipe';


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ViewSelectionComponent,
    DashboardComponent,
    KeysPipe
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
