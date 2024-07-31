import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface projData{
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
 
    title = 'proj_track_f';
    PROJECT_DATA:projData[]=[
      {
        "project_id": "P001",
        "project_name": "Project Alpha",
        "project_desc": "This is a description of Project Alpha.",
        "project_start_Date": "2024-01-15",
        "actual_start_Date": "2024-01-20",
        "planned_end_Date": "2024-12-31",
        "actual_end_Date": "",
        "revised_Completion_date_1": "2025-01-15",
        "revised_Completion_date_2": "2025-02-15",
        "action_owner": "John Doe",
        "action_Owner_dept": "Development",
        "project_Status": "In Progress",
        "owner_Id": "E123",
        "remarks": "Project is on track."
      },
      {
        "project_id": "P002",
        "project_name": "Project Beta",
        "project_desc": "This is a description of Project Beta.",
        "project_start_Date": "2024-02-01",
        "actual_start_Date": "2024-02-05",
        "planned_end_Date": "2024-11-30",
        "actual_end_Date": "",
        "revised_Completion_date_1": "2024-12-15",
        "revised_Completion_date_2": "",
        "action_owner": "Jane Smith",
        "action_Owner_dept": "Marketing",
        "project_Status": "Delayed",
        "owner_Id": "E456",
        "remarks": "Project is facing delays due to resource constraints."
      },
      {
        "project_id": "P003",
        "project_name": "Project Gamma",
        "project_desc": "This is a description of Project Gamma.",
        "project_start_Date": "2024-03-10",
        "actual_start_Date": "2024-03-12",
        "planned_end_Date": "2024-10-20",
        "actual_end_Date": "",
        "revised_Completion_date_1": "2024-11-15",
        "revised_Completion_date_2": "",
        "action_owner": "Alice Johnson",
        "action_Owner_dept": "Finance",
        "project_Status": "On Hold",
        "owner_Id": "E789",
        "remarks": "Project is on hold due to budget approval pending."
      }
     
    ]
    sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
  
    constructor(private router : Router) {}

   
  
    navigateURL(path : string) {
      this.router.navigate([path]);

    }
    
  }
