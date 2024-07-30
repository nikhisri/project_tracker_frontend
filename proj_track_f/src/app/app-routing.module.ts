import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'projectform',component:ProjectFormComponent
  },
  {
    path: 'table',component:TableComponent
  },
  {
    path: 'dash',component:DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
