import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';

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


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {

constructor(private router : Router,   public api: ApiService ,public dialog: MatDialog ) {}
    data: any[]=[];
  ACTION_DATA:actionsData[]=[];
  sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;

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
    
    ngOnInit(): void {
      this.get();
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
