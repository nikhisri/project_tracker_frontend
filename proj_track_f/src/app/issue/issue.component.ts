import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IssueFormComponent } from '../components/issue-form/issue-form.component';
 
export interface issueData{
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
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent {
data: any[]=[];
  ISSUE_DATA:issueData[]=[];
//     {
//       "project_id": "PRJ-123321",
//       "project_name": "Project Alpha",
//       "issue_desc": "Critical issue affecting the deployment",
//       "issueRaiseddate": "2024-07-10T00:00:00.000Z",
//       "targetDate": "2024-07-20T00:00:00.000Z",
//       "action_owner": "John Doe",
//       "issue_id": "issue-001",
//       "issue_Status": "Open",
//       "remarks": "This issue needs to be resolved before the next release.",
//   },
//   {
//     "project_id": "PRJ-123322",
//     "project_name": "Project Alpha",
//     "issue_desc": "Critical issue affecting the deployment",
//     "issueRaiseddate": "2024-07-10T00:00:00.000Z",
//     "targetDate": "2024-07-20T00:00:00.000Z",
//     "action_owner": "John Doe",
//     "issue_id": "issue-001",
//     "issue_Status": "Inprogress",
//     "remarks": "This issue needs to be resolved before the next release.",
// },
// {
//   "project_id": "PRJ-123323",
//   "project_name": "Project Alpha",
//   "issue_desc": "Critical issue affecting the deployment",
//   "issueRaiseddate": "2024-07-10T00:00:00.000Z",
//   "targetDate": "2024-07-20T00:00:00.000Z",
//   "action_owner": "John Doe",
//   "issue_id": "issue-001",
//   "issue_Status": "Closed",
//   "remarks": "This issue needs to be resolved before the next release.",
// },
 

constructor(private router : Router, 
  public api: ApiService,public dialog: MatDialog
) {}
PROJECT_DATA:any[]=[];
    sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
  
    navigateURL(path : string) {
      this.router.navigate([path]);
    }
      openForm(enterAnimationDuration: string, exitAnimationDuration:string) : void{
        this.dialog.open(IssueFormComponent, {
          width: '1100px',
          enterAnimationDuration,
          exitAnimationDuration,
    });
    }
ngOnInit(): void {
  this.get();
}

get() {
  this.api.get('http://localhost:5000/v1/user/getallissue').then((data: any) => {
    if (data) {
      console.log("HI",data);
      this.ISSUE_DATA = data.data;
      console.log(this.ISSUE_DATA);
    } else {
      console.log('Not Found');
    }
  });}
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
      label : "Projects",
      to : "/project"
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

