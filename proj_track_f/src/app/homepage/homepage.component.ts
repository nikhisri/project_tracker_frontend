import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
  projectCount: number | null = null;
  KeyIssueCount: number | null = null;
  ActionCount: number | null = null;
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getProjectCount();
    this.getKeyIssueCount();
    this.getActionCount();
  }

  getProjectCount(): void {
    this.api.get('http://localhost:5000/v1/user/countproj').then((data: any) => {
      if (data && data.status === 'success') {
        this.projectCount = data.count;
        console.log('Number of projects:', this.projectCount);
      } else {
        console.log('Failed to retrieve project count');
      }
    }).catch((error) => {
      console.log('Error fetching project count:', error);
    });
  }

  getKeyIssueCount(): void {
    this.api.get('http://localhost:5000/v1/user/countkeyissue').then((data: any) => {
      if (data && data.status === 'success') {
        this.KeyIssueCount = data.count;
        console.log('Number of Keyissues:', this.KeyIssueCount);
      } else {
        console.log('Failed to retrieve project count');
      }
    }).catch((error) => {
      console.log('Error fetching project count:', error);
    });
  }

  getActionCount(): void {
    this.api.get('http://localhost:5000/v1/user/countaction').then((data: any) => {
      if (data && data.status === 'success') {
        this.ActionCount = data.count;
        console.log('Number of Action:', this.ActionCount);
      } else {
        console.log('Failed to retrieve project count');
      }
    }).catch((error) => {
      console.log('Error fetching project count:', error);
    });
  }



  navigateURL(arg0: any) {
    throw new Error('Method not implemented.');
    }
      title = 'project';
    // sidenavMenu: any;
    sidenavMenu : Array<SIDENAV_INTERFACE> = SIDENAV_MENUS;
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