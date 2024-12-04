import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import {

  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  projectManager: string;
  date: string;
  status: string;
  progress: number; // Add the progress property
}
export interface tabelement {
  checkbox: boolean;
  data: string;
  status: string;
}
export interface Project {
  id: number;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Project 1',
    projectManager: 'John Doe ',
    date: 'May 25, 2023',
    status: 'Completed',
    progress: 100,
  },
  {
    name: 'Project 2',
    projectManager: 'Neilsan mando',
    date: 'May 25, 2023',
    status: 'Delayed',
    progress: 40,
  },
  {
    name: 'Project 3',
    projectManager: 'John Doe',
    date: 'May 25, 2023',
    status: 'In-Progress',
    progress: 50,
  },
  {
    name: 'Project 4',
    projectManager: 'Matte hannery',
    date: 'May 25, 2023',
    status: 'Completed',
    progress: 70,
  },
  {
    name: 'Project 5',
    projectManager: 'Matte hannery',
    date: 'May 25, 2023',
    status: 'Completed',
    progress: 70,
  },
];

const tabdata: tabelement[] = [
  {
    checkbox: true,
    data: 'Create a user flow of social application design',
    status: 'Approved',
  },
  {
    checkbox: false,
    data: 'Create a user flow of social application design',
    status: 'In review',
  },
  {
    checkbox: true,
    data: 'Create a user flow of social application design',
    status: 'In review',
  },
  {
    checkbox: false,
    data: 'Create a user flow of social application design',
    status: 'On going',
  },
];
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
    
  @ViewChild('chartCanvas', { static: true }) chartCanvas: ElementRef |any;
  public projectCount: number | null = null;
  public KeyIssueCount: number | null = null;
  public ActionCount: number | null = null;
  // private chart: Chart | undefined;
  constructor(private api: ApiService,private router:Router,private http: HttpClient) { }

  getProjectCount(): void {
    this.api.get('http://localhost:5000/v1/user/countproj').then((data: any) => {
      if (data && data.status === 'success') {
        this.projectCount = data.procount;
        this.KeyIssueCount = data.issuecount;
        this.ActionCount = data.actioncount;
        console.log('Number of projects:', this.KeyIssueCount);
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


  displayedColumns: string[] = [
    'name',
    'projectmanager',
    'date',
    'status',
    'progress',
  ];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = ELEMENT_DATA;
  // tabsource=tabdata;
  projects: Project[] = [
    { id: 1, name: '2023' },
    { id: 2, name: '2022' },
    { id: 3, name: '2021' },
  ];

  selectedProject: Project | undefined;
  clickedRows = new Set<PeriodicElement>();
  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'completed-status';
      case 'In-Progress':
        return 'ongoing-status';
      case 'At risk':
        return 'atrisk-status';
      case 'Delayed':
        return 'atrisk-status';
      default:
        return ''; // Default or fallback class
    }
  }

  // ngAfterViewInit(): void {
  //   this.createGaugeChart();
  // }

  getabstatus(status: string): string {
    switch (status) {
      case 'Approved':
        return 'completed-status';
      case 'On going':
        return 'ongoing-status';
      case 'In review':
        return 'atrisk-status';

      default:
        return ''; // Default or fallback class
    }
  }
  isChecked: boolean = false;
  tabsource: tabelement[] = tabdata;
  // toggleCheckbox(element: any): void {
  //   element.checkbox = !element.checkbox;
  // }
  toggleCheckbox(row: tabelement): void {
    row.checkbox = !row.checkbox;
  }
  toggleRow(element: any): void {
    // Implement your toggleRow logic here
    if (this.clickedRows.has(element)) {
      this.clickedRows.delete(element);
    } else {
      this.clickedRows.add(element);
    }
  }

  totalProjects = 95;
  completedProjects = 26;
  delayedProjects = 35;
  ongoingProjects = 35;
  gaugeType = 'semi';
  gaugeValue = 28.3;
  user:any;
  gaugeLabel = 'Speed';
  gaugeAppendText = 'km/hr';
  public chart: any;
  adminFlag:boolean=false;
  supervisorFlag:boolean=false;
  userFlag:boolean=false;
  ngOnInit() {
    
      const storedUser = localStorage.getItem('user');
      this.getProjectCount();
      console.log("huii",this.projectCount);
      this.user = storedUser ? JSON.parse(storedUser) : null;
      console.log('user......', this.user);

      if (this.user.role === 'admin') {
        this.adminFlag = true;
      }
      if (this.user.role === 'supervisor') {
        this.supervisorFlag = true;
        // console.log('setting flag', this.supervisorFlag);
      }
      if (this.user.role === 'user') {
        this.userFlag = true;
      }
      this.getProjectCount();
      console.log("huii",this.projectCount);
      this.getKeyIssueCount();
      this.getActionCount();
    
    // this.createGaugeChart()
  }

  ngAfterViewInit() {
    this.createChart();
    // this.getProjectCount();
    console.log(this.KeyIssueCount);
  }
  // createGaugeChart(): void {
  //   const ctx = this.chartCanvas.nativeElement.getContext('2d');

  //   const gaugeChart = new Chart(ctx, {
  //     type: 'tsgauge',
  //     data: {
  //       datasets: [{
  //         data: [8.9],
  //         backgroundColor: ['rgba(0, 117, 194, 1)'],
  //       }],
  //     },
  //     options: {
  //       needle: {
  //         radiusPercentage: 2,
  //         widthPercentage: 3,
  //         lengthPercentage: 80,
  //         color: 'rgba(255, 0, 0, 1)',
  //       },
  //       valueLabel: {
  //         formatter: (value) => value.toFixed(1),
  //       },
  //       showValue: true,
  //       valueInt: 1,
  //       valueDec: 1,
  //       maxValue: 10,
  //       minValue: 0,
  //       startAngle: -1.5,
  //       endAngle: 1.5,
  //       labels: ['0', '2.5', '5', '7.5', '10'],
  //     } as GaugeChartOptions, // Cast the options to the extended type
  //   });
  // }

  isDropdownOpen: boolean = false;

  // method to toggle dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // method to select a project
  selectProject(project: any) {
    this.selectedProject = project;
    this.isDropdownOpen = false;
  }
  
  private createChart(): void {
    // Register Chart.js components
    Chart.register(...registerables);

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Fetch issues data from the API
    this.http.get<number[]>('http://localhost:5000/v1/user/getcountmonth/2024').subscribe(issuesData => {
      // const actionsData = [3, 5, 6, 4, 7, 8, 3, 5, 4, 6, 7, 8]; // Hardcoded data for Actions
      // const projectsData = [10, 15, 20, 18, 22, 24, 20, 25, 22, 24, 27, 30]; // Hardcoded data for Projects

      if (this.chart) {
        this.chart.destroy(); // Destroy any existing chart instance before creating a new one
      }

      this.chart = new Chart('MyChart', {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Issues',
              data: issuesData,
              borderColor: '#005759',
              backgroundColor: 'rgb(0, 87, 89,0.2)', // Semi-transparent background color
              //fill: true // Fill the area under the line
            },
            // {
            //   label: 'Actions',
            //   data: actionsData,
            //   borderColor: '#33FF57',
            //   backgroundColor: 'rgba(51, 255, 87, 0.2)', // Semi-transparent background color
            //   fill: true // Fill the area under the line
            // },
            // {
            //   label: 'Projects',
            //   data: projectsData,
            //   borderColor: '#1E90FF',
            //   backgroundColor: 'rgba(30, 144, 255, 0.2)', // Semi-transparent background color
            //   fill: true // Fill the area under the line
            // }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const label = tooltipItem.dataset.label || '';
                  return `${label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Count'
              }
            }
          },
          aspectRatio: 1.5
        }
      });
    });
      this.http.get<any>('http://localhost:5000/v1/user/actionstatus/2024').subscribe(piedata=>{
                  // Code for the second chart remains unchanged
      new Chart('donut', {
        type: 'doughnut',
        data: {
          labels: ['Paid', 'Pending', 'Draft', 'OverDue'],
          datasets: [
            {
              label: 'Projects',
              data:piedata.counts,
              backgroundColor: ['#005759', '#238488', '#31AAB0', '#44D4DB'],
            }
          ]
        },
        options: {
          aspectRatio: 1.5,
        },
      });    
      });
    
  }

  renderHorizontalDoughnutChart(): void {
    const ctx = (
      document.getElementById('horizontalDonutChart') as HTMLCanvasElement
    ).getContext('2d')!;

    if (!ctx) {
      console.error('Unable to get 2D rendering context');
      return;
    }

    Chart.register(...registerables);

    const percentageCompleted =
      (this.completedProjects / this.totalProjects) * 100;
    const percentageDelayed = (this.delayedProjects / this.totalProjects) * 100;
    const percentageOngoing = (this.ongoingProjects / this.totalProjects) * 100;

    const horizontalDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Delayed', 'Ongoing'],
        datasets: [
          {
            data: [percentageCompleted, percentageDelayed, percentageOngoing],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
          },
        ],
      },
      options: {
        cutout: '50%',
        rotation: -0.5 * Math.PI,
        circumference: Math.PI,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Total Projects: ${this.totalProjects}`,
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${(
                  (value / 100) *
                  this.totalProjects
                ).toFixed(0)}`;
              },
            },
          },
        },
      },
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return '#1A932E'; // Blue color for Completed status
      case 'On going':
        return '#E65F2B'; // Yellow color for On going status
      case 'At risk':
        return '#EE201C'; // Red color for At risk status
      case 'Delayed':
        return '#EE201C'; // Red color for Delayed status
      default:
        return '#ccc'; // Default color
    }
  }

  onProjectSelect(event: any): void {
    this.selectedoverall = event.target.value;
    // this.selectedload=event.target.value;
  }
  selectedload: string = 'Today'; // Set the default value here
  selectedoverall: string = 'All';

  timesheet() {
    this.router.navigate(['taqa/timesheet']);
  }
  
      title = 'project';
    // sidenavMenu: any;
}
function piedata(value: Object): void {
  throw new Error('Function not implemented.');
}
