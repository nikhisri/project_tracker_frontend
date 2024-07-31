import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  // {
    // path:'login',component: LoginComponent, loadChildren:() =>import('../../')
  // }
  {
    path: 'projectform',component:ProjectFormComponent
  },
  {
    path: 'table',component:TableComponent
  },
  {
    path: 'dash',component:DashboardComponent
  },
  {
    path:'',component:LoginComponent
  },
  {
    path:'home',component:HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
