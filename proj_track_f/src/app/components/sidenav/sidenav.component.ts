import { Component } from '@angular/core';
import { Router } from '@angular/router';


type SIDENAV_INTERFACE = {
  label : string,
  to : string,
  icon : string
}

const SIDENAV_MENUS : Array<SIDENAV_INTERFACE>= [
    {
      label : "Dashboard",
      to : "/dashboard",
      icon: "dashboard"
    },
    {
      label : "Projects",
      to : "/project",
      icon: "assignment"
    },
    {
      label : "Key Issues",
      to : "/issue",
      icon: "bug_report"
    },
    {
      label : "Required Actions",
      to : "/actions",
      icon: "bolt"
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

  activeUrl !: string;

  ngOnInit() {
    this.activeUrl = this.router.url;
    
  }

  navigateURL(path : string) {

    this.router.navigate([path]);

  }
}
