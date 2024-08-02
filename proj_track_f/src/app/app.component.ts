import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'project';  
  constructor(private router:Router){}
  sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
  navigateURL(path : string) {
    this.router.navigate([path]);
  }
 
  
}


