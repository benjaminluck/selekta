import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ViewSelectionComponent }  from './view-selection.component';
import { TwoComponent }  from './two.component';

import { AppRoutingModule } from './app-routing.module';

import { KeysPipe } from './keys.pipe';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    ViewSelectionComponent,
    TwoComponent,
    KeysPipe
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
