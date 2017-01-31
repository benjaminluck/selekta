import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewSelectionComponent }   from './view-selection.component';
import { DashboardComponent }   from './dashboard.component';

const routes: Routes = [
  { path: 'view-selection',  component: ViewSelectionComponent },
  { path: 'dashboard',  component: DashboardComponent }
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
