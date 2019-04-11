import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGrantComponent } from './dashboard-grant/dashboard-grant.component';
import { FormControlComponent } from './form-control/form-control.component'

const routes: Routes = [
  { path: 'dashboard-approval', component: DashboardComponent },
  { path: 'dashboard-grant', component: DashboardGrantComponent },
  { path: 'form', component: FormControlComponent },
  { path: '',
    redirectTo: '/form',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
