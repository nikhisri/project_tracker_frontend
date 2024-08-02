import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectFormComponent } from 'src/app/project-form/project-form.component';

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
  @Input() columnMapping: { [key: string]: string } = {};
  // dataSource1: MatTableDataSource<any> = new MatTableDataSource();
  @Output() deleteProject: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = [];
  filteredData: any[] = [];
  displayedColumnsWithEllipsis: string[] = [];
  selectedElement: any = null;
  maxDescLength: number = 100;

  constructor( public api: ApiService ,public dialog: MatDialog ) {}
  data: any[]=[];
  PROJECT_DATA:any[]=[];

  ngOnInit(): void {
    
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
    this.get();
  }
    //getbyprojectid api call --> response
    get() {
      this.api.get('http://localhost:5000/v1/user/projectbyid/'+ this.pid).then((data: any) => {
        if (data) {
          console.log(data);
          this.PROJECT_DATA = data;
          console.log(this.PROJECT_DATA);
          this.openForm(this.PROJECT_DATA);
        } else {
          console.log('Not Found');
        }
      });
  // } 
  }
  openForm(projectData?:any): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '1100px',
      data: projectData || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle any actions after the dialog is closed, e.g., refresh the table data
      }
    });
  }

  onDeleteClick(rowId: string): void {
    // Handle delete action here
    console.log('Delete row with ID:', rowId);
  }
}