import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGrantComponent } from './dashboard-grant/dashboard-grant.component';
import { FormRequestComponent } from './form-request/form-request.component'
import { FormCategoryComponent } from './form-category/form-category.component'
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'dashboard-approval', component: DashboardComponent },
  { path: 'dashboard-grant', component: DashboardGrantComponent },
  { path: 'dashboard-search', component: SearchComponent },
  { path: 'form', component: FormRequestComponent },
  { path: 'form-category', component: FormCategoryComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
