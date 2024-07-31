import { Component } from '@angular/core';

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

  ISSUE_DATA:issueData[]=[
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

}
