import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectFormComponent } from 'src/app/project-form/project-form.component';
import { ProjectForm2Component } from 'src/app/project-form2/project-form2.component';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { ActionFormComponent } from '../action-form/action-form.component';
import { ComponentType } from '@angular/cdk/portal';

export interface DashboardElement{
  trcode: string;
  name: string;
  due_date: string;
  status: string;
}
export interface TableData {
  [key: string]: any;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() table!: string;
  @Input() columnMapping: { [key: string]: string } = {};
  // dataSource1: MatTableDataSource<any> = new MatTableDataSource();
  @Output() deleteProject: EventEmitter<string> = new EventEmitter<string>();
  
  displayedColumns: string[] = [];
  filteredData: any[] = [];
  displayedColumnsWithEllipsis: string[] = [];
  selectedElement: any = null;
  maxDescLength: number = 100;
  disabled: boolean=true;
  userRole: string | undefined;

  constructor( public api: ApiService ,public dialog: MatDialog ) {}
  data: any[]=[];
  PROJECT_DATA:any[]=[];

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || "";
    if(this.userRole==="project manager"&& this.table==="project" ){
      this.disabled=false
    }
    else if
      (this.userRole==="tester"&& this.table==="issue"){
        this.disabled=false
    }
    else if
    (this.userRole==="developer"&& this.table==="action"){
      this.disabled=false
  }
console.log(this.disabled)
    console.log("data in table ", this.dataSource);
    this.filteredData = [...this.dataSource];
    this.determineDisplayedColumns();
  }
  ngAfterContentChecked(){
    console.log("data in table viewinit ", this.dataSource);
    // this.filteredData = [...this.dataSource];
    this.determineDisplayedColumns();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.filteredData = [...this.dataSource];
      // this.determineDisplayedColumns();
    }
  }
  
  
  
 allKeys:any;
  // Determine displayed columns dynamically based on the structure of the data
  determineDisplayedColumns(): void {
    if (this.dataSource.length > 0) {
      const allKeys = this.dataSource.reduce((keys, item) => {
        return keys.concat(Object.keys(item));
      }, [] as string[]);
      this.displayedColumns = Array.from(new Set(allKeys));
      this.displayedColumnsWithEllipsis = [...this.displayedColumns, 'ellipsis'];
    } else {
      this.displayedColumns = [];
      this.displayedColumnsWithEllipsis = [];
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.dataSource.filter(item => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().includes(filterValue);
      });
    });
  }

  

 
  // Check if a value is a string
  isString(value: any): boolean {
    return typeof value === 'string';
  }
 
  getDisplayName(column: string): string {
    return this.columnMapping[column] || column;
  }
  pid:any;
  onEditClick(rowId: string): void {
    // Handle edit action here
    console.log('Edit row with ID:', rowId);
    this.pid=rowId;
    console.log("hi",this.table);
    if(this.table ==="project"){
    this.getbyprojectid();
  }
  else if(this.table ==="issue"){
    this.getbyissueid();
  }
  else{
    this.getbyactionid();
  }
  }
    //getbyprojectid api call --> response
    getbyprojectid() {
      this.api.get('http://localhost:5000/v1/user/projectbyid/'+ this.pid).then((data: any) => {
        if (data) {
          console.log(data);
          this.PROJECT_DATA = data;
          console.log(this.PROJECT_DATA);
          this.openForm(ProjectForm2Component,this.PROJECT_DATA);
        } else {
          console.log('Not Found');
        }
      });
    }
    getbyissueid() {
      this.api.get('http://localhost:5000/v1/user/getissuebyid/'+ this.pid).then((data: any) => {
        if (data) {
          console.log(data);
          this.PROJECT_DATA = data;
          console.log(this.PROJECT_DATA);
          this.openForm(IssueFormComponent,this.PROJECT_DATA);
        } else {
          console.log('Not Found');
        }
      });
  } 
    getbyactionid() {
      this.api.get('http://localhost:5000/v1/user/getactionbyid/'+ this.pid).then((data: any) => {
        if (data) {
          console.log(data);
          this.PROJECT_DATA = data;
          console.log(this.PROJECT_DATA);
          this.openForm(ActionFormComponent,this.PROJECT_DATA);
        } else {
          console.log('Not Found');
        }
      });
  } 
  // }
  openForm(formcomponent:ComponentType<ProjectForm2Component | IssueFormComponent | ActionFormComponent>,projectData?:any): void {
    console.log("bye",formcomponent);
    const dialogRef = this.dialog.open(formcomponent, {
      width: '1100px',
      data: projectData || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle any actions after the dialog is closed, e.g., refresh the table data
      }
    });
  
  // onDeleteClick(rowId: string): void {
  //   // Handle delete action here
  //   console.log('Delete row with ID:', rowId);
  // }
}
onDeleteClick(project_id: string): void {
  console.log(project_id);
  this.deleteProject.emit(project_id);
}
}
