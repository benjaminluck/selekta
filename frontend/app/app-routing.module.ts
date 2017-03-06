import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewSelectionComponent }   from './view-selection.component';
import { DashboardComponent }   from './dashboard.component';
import { ConfigurationsComponent }   from './configurations.component';

const routes: Routes = [
  { path: 'view-vault',  component: ViewSelectionComponent, data: [{ "shapeData" : "unstructured"}] },
  { path: 'view-selection',  component: ViewSelectionComponent},
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'configurations',  component: ConfigurationsComponent },
  { path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
