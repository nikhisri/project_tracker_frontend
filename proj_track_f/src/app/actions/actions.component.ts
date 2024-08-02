import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionFormComponent } from '../components/action-form/action-form.component';

export interface actionsData{
  project_id:String;
  action_id:String;
  issue_id:String;
  action_desc:String;
  action_owner:String;
  action_status:String;
  target_date:String;
  remarks:String;
}

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {

    data: any[]=[];
  ACTION_DATA:actionsData[]=[];

  necessaryColumns: string[] =  [
    // 'project_id', 
    'action_id', 
    'issue_id', 
    'action_desc', 
    'action_owner',
    'action_status', 
    'target_date',
    //  'remarks'
  ];

  columnMapping: { [key: string]: string } = {
    // project_id: 'Project ID',
    project_id: 'Project ID',
    action_id: 'Action ID',
    issue_id: 'Issue ID',
    action_desc: 'Action Description',
    action_owner: 'Action Owner',
    action_status: 'Action Status',
    target_date: 'Completion Date',
    remarks: 'Remarks',
    
  };

    constructor(private router : Router, 
      public api: ApiService,public dialog: MatDialog
    ) {}
    PROJECT_DATA:any[]=[];
  
    openForm(enterAnimationDuration: string, exitAnimationDuration:string) : void{
      this.dialog.open(ActionFormComponent, {
        width: '1100px',
        enterAnimationDuration,
        exitAnimationDuration,
  });
  }

    ngOnInit(): void {
      this.get();
    }
    navigateURL(path : string) {
      this.router.navigate([path]);
    }
    get() {
      this.api.get('http://localhost:5000/v1/user/getallaction').then((data: any) => {
        if (data) {
          console.log("HI",data);
          // this.ACTION_DATA = data.data;
          this.ACTION_DATA = data.data.map((project: any) => {
            // Filter to include only necessary columns
            return this.necessaryColumns.reduce((obj: any, key: string) => {
              if (project[key] !== undefined) {
                obj[key] = project[key];
              }
              return obj;
            }, {});
          });
          console.log(this.ACTION_DATA);
        } else {
          console.log('Not Found');
        }
      });
      }    
}



