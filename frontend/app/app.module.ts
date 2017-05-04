import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ClarityModule } from 'clarity-angular';

import { AppComponent }  from './app.component';
import { ViewSelectionComponent }  from './view-selection.component';
import { ViewVaultComponent }  from './view-vault.component'; 
import { DashboardComponent }  from './dashboard.component';
import { ConfigurationsComponent }  from './configurations.component';

import { AppRoutingModule } from './app-routing.module';

import { KeysPipe } from './keys.pipe';


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ClarityModule.forRoot(),
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ViewSelectionComponent,
    ViewVaultComponent, 
    DashboardComponent,
    ConfigurationsComponent,
    KeysPipe
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
