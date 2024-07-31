import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueComponent } from './issue/issue.component';
import { ActionsComponent } from './actions/actions.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { ActionFormComponent } from './components/action-form/action-form.component';
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
    path: 'issue',component:IssueComponent
  },
  {
    path: 'actions',component:ActionsComponent
  },
    path: 'issueform',component:IssueFormComponent
  },

  {
    path: 'actionform',component:ActionFormComponent
    
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
