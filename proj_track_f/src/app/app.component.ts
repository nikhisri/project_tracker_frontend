import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
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
},]
// ACTION_DATA:actionData[]=[
  
//     {
//       "project_id": "proj123",
//       "action_id": "act456",
//       "issue_id": "iss789",
//       "action_desc": "Description of the required action.",
//       "action_owner": "John Doe",
//       "action_status": "Open",
//       "target_date": "2024-08-01T00:00:00.000Z",
//       "remarks": "This is a sample remark."
//     }
    
      // ]
  sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;

  constructor(private router : Router) {}
  navigateURL(path : string) {
      this.router.navigate([path]);

    }
}
