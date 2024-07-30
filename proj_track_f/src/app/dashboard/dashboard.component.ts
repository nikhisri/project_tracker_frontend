import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  
    constructor(private router : Router) {}
    navigateToProjectForm(): void {
      this.router.navigate(['/project-form']);
    }
  
    navigateURL(path : string) {
      this.router.navigate([path]);
    }
  }
export interface projectData{
  project_id:String;
  project_name:String;
  issue_desc:String;
  issueRaiseddate:String;
  targetDate:String;

  action_owner:String;
 
  issue_id:String;
  issue_Status:String;
  remarks:String;
  
}

type SIDENAV_INTERFACE = {
  label : string,
  to : string
}

const SIDENAV_MENUS : Array<SIDENAV_INTERFACE>= [
    {
      label : "Dashboard",
      to : "/dashboard"
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





