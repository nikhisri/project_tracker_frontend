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
  projectCount: number | null = null;
  KeyIssueCount: number | null = null;
  ActionCount: number | null = null;
  // private chart: Chart | undefined;
  constructor(private api: ApiService,private router:Router) { }

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
    this.createChart();
    
      const storedUser = localStorage.getItem('user');
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
      this.getKeyIssueCount();
      this.getActionCount();
    
    // this.createGaugeChart()
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

    const issuesData = [5, 7, 8, 6, 9, 10, 5, 8, 6, 7, 8, 9]; // Data for Issues
    const actionsData = [3, 5, 6, 4, 7, 8, 3, 5, 4, 6, 7, 8]; // Data for Actions
    const projectsData = [10, 15, 20, 18, 22, 24, 20, 25, 22, 24, 27, 30]; // Data for Projects

    if (this.chart) {
      this.chart.destroy(); // Destroy any existing chart instance before creating a new one
    }

    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Issues',
            data: issuesData,
            backgroundColor: '#005759',
            stack: 'stack1'
          },
          {
            label: 'Actions',
            data: actionsData,
            backgroundColor: '#238488',
            stack: 'stack1'
          },
          {
            label: 'Projects',
            data: projectsData,
            backgroundColor: '#31AAB0',
            stack: 'stack1'
          }
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
            stacked: true
          },
          y: {
            stacked: true
          }
        },
        aspectRatio: 1.5
      }
    });

    // Code for the second chart remains unchanged
    new Chart('donut', {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Pending', 'Draft', 'OverDue'],
        datasets: [
          {
            label: 'Projects',
            data: [95, 26, 35, 35],
            backgroundColor: ['#005759', '#238488', '#31AAB0', '#44D4DB'],
          }
        ]
      },
      options: {
        aspectRatio: 1.5,
      },
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
