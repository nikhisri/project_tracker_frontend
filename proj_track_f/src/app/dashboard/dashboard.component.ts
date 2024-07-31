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
  
    
  
    constructor(private router : Router,   public api: ApiService ,public dialog: MatDialog ) {}
    data: any[]=[];
 
    title = 'proj_track_f';
    
    PROJECT_DATA:any[]=[];
    sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
  
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
      this.api.get('http://localhost:5000/v1/user/getAllProjects').then((data: any) => {
        if (data) {
          console.log(data);
          this.PROJECT_DATA = data.data;
          console.log(this.PROJECT_DATA);
        } else {
          console.log('Not Found');
        }
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
