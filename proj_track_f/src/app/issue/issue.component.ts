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
  constructor(private router : Router,   public api: ApiService ,public dialog: MatDialog ) {}
  data: any[]=[];
  ISSUE_DATA:issueData[]=[];

  necessaryColumns: string[] = [
    'project_id', 'issue_desc', 'issueRaiseddate', 'targetDate', 
    'issue_id', 'issue_Status'
  ];
  
    columnMapping: { [key: string]: string } = {
      issue_id: 'Issue ID',
      project_id: 'Project ID',
      project_name: 'Project Name',
      issue_desc: 'Issue Description',
      issueRaiseddate: 'Issue Raised Date',
      targetDate: 'Target Date',
      action_owner: 'Action Owner',
      // issue_id: 'Issue ID',
      issue_Status: 'Issue Status',
      remarks: 'Remarks'
    };

  
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
      // this.ISSUE_DATA = data.data;
      this.ISSUE_DATA = data.data.map((project: any) => {
        // Filter to include only necessary columns
        return this.necessaryColumns.reduce((obj: any, key: string) => {
          if (project[key] !== undefined) {
            obj[key] = project[key];
          }
          return obj;
        }, {});
      });
      console.log(this.ISSUE_DATA);
    } else {
      console.log('Not Found');
    }
  });
  }  
  onDeleteProject(project_id: string): void {
    console.log("hi",project_id);
    this.api.post('http://localhost:5000/v1/user/deleteissue', { id:project_id }).then((data: any) => {
      if (data) {
        console.log('Delete successful', data);
        if(data && data.message === "Project deleted successfully"){
          this.get();
        }
      } else {
        console.log('Delete failed');
      }
    }).catch((error) => {
      console.log('Post error', error);
    });
  }  
}


