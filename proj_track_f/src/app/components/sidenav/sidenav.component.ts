import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
  selector: 'SideBar',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  constructor(private router : Router ) {}

  sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;

  navigateURL(path : string) {

    this.router.navigate([path]);

  }
}
