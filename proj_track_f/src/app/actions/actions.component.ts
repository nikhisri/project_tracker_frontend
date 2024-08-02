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
    // {
    //   "project_id": "P001",
    //   "action_id": "A001",
    //   "issue_id": "I001",
    //   "action_desc": "Resolve initial setup issues",
    //   "action_owner": "John Doe",
    //   "action_status": "In Progress",
    //   "target_date": "2024-08-15",
    //   "remarks": "Working on the initial setup tasks"
    // },
    // {
    //   "project_id": "P002",
    //   "action_id": "A002",
    //   "issue_id": "I002",
    //   "action_desc": "Update project documentation",
    //   "action_owner": "Jane Smith",
    //   "action_status": "Completed",
    //   "target_date": "2024-07-30",
    //   "remarks": "Documentation updated successfully"
    // },
    // {
    //   "project_id": "P003",
    //   "action_id": "A003",
    //   "issue_id": "I003",
    //   "action_desc": "Review budget allocation",
    //   "action_owner": "Alice Johnson",
    //   "action_status": "Pending",
    //   "target_date": "2024-08-10",
    //   "remarks": "Awaiting budget approval"
    // }
 
    constructor(private router : Router, 
      public api: ApiService,public dialog: MatDialog
    ) {}
    PROJECT_DATA:any[]=[];
    sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
  
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
          this.ACTION_DATA = data.data;
          console.log(this.ACTION_DATA);
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

