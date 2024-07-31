import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';


import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 
    title = 'proj_track_f';
    PROJECT_DATA:projectData[]=[
      {
        "project_id": "PRJ-123321",
        "project_name": "Project Alpha",
        "issue_desc": "Critical issue affecting the deployment",
        "issueRaiseddate": "2024-07-10T00:00:00.000Z",
        "targetDate": "2024-07-20T00:00:00.000Z",
        "action_owner": "John Doe",
        "issue_id": "issue-001",
        "issue_Status": "Open",
        "remarks": "This issue needs to be resolved before the next release.",
    },
    {
      "project_id": "PRJ-123322",
      "project_name": "Project Alpha",
      "issue_desc": "Critical issue affecting the deployment",
      "issueRaiseddate": "2024-07-10T00:00:00.000Z",
      "targetDate": "2024-07-20T00:00:00.000Z",
      "action_owner": "John Doe",
      "issue_id": "issue-001",
      "issue_Status": "Inprogress",
      "remarks": "This issue needs to be resolved before the next release.",
  },
  {
    "project_id": "PRJ-123323",
    "project_name": "Project Alpha",
    "issue_desc": "Critical issue affecting the deployment",
    "issueRaiseddate": "2024-07-10T00:00:00.000Z",
    "targetDate": "2024-07-20T00:00:00.000Z",
    "action_owner": "John Doe",
    "issue_id": "issue-001",
    "issue_Status": "Closed",
    "remarks": "This issue needs to be resolved before the next release.",
  },
    ]
    sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
  
    constructor(private router : Router,public dialog: MatDialog) {}
    navigateToProjectForm(): void {
      this.router.navigate(['/project-form']);
    }
  
    navigateURL(path : string) {
      this.router.navigate([path]);
    }
   openForm(enterAnimationDuration: string, exitAnimationDuration:string) : void{
    this.dialog.open(ProjectFormComponent, {
      width: '1100px',
      enterAnimationDuration,
      exitAnimationDuration,
});
}
}
export interface projectData{
  project_id:String;
  project_name:String;
  project_desc:String;
  project_start_Date:String;
  actual_start_Date:String;
  planned_end_Date:String;
  actual_end_Date:String;
  revised_Completion_date_1:String;
  revised_Completion_date_2:String;
  action_owner:String;
  action_Owner_dept:String;
  project_Status:String;
  owner_Id:String;
  remarks:String;
}



type SIDENAV_INTERFACE = {
  label : string,
  to : string
}

const SIDENAV_MENUS : Array<SIDENAV_INTERFACE>= [
    {
      label : "Dashboard",
      to : "/dash"
    },
    {
      label : "Key Issues",
      to : "/issue"
    },
    {
      label : "Required Actions",
      to : "/actions"
    }
]


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data: any[]=[];
 
    title = 'proj_track_f';
    
    PROJECT_DATA:projData[]=[];
      // {
      //   "project_id": "P001",
      //   "project_name": "Project Alpha",
      //   "project_desc": "This is a description of Project Alpha.",
      //   "project_start_Date": "2024-01-15",
      //   "actual_start_Date": "2024-01-20",
      //   "planned_end_Date": "2024-12-31",
      //   "actual_end_Date": "",
      //   "revised_Completion_date_1": "2025-01-15",
      //   "revised_Completion_date_2": "2025-02-15",
      //   "action_owner": "John Doe",
      //   "action_Owner_dept": "Development",
      //   "project_Status": "In Progress",
      //   "owner_Id": "E123",
      //   "remarks": "Project is on track."
      // },
      
     
    
    sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
  
    constructor(private router : Router, 
      public api: ApiService
    ) {}

   
  
    navigateURL(path : string) {
      this.router.navigate([path]);

    }

    ngOnInit(): void {
      this.get();
    }
  
    get() {
      this.api.get('http://localhost:5000/v1/user/getAllProjects').then((data: any) => {
        if (data) {
          console.log(data);
          this.PROJECT_DATA = data.data;
          console.log(this.PROJECT_DATA);
        } else {
          console.log('Not Found');
        }
      });}
      
      
    
  }
