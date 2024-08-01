import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = [];
  filteredData: any[] = [];
  displayedColumnsWithEllipsis: string[] = [];
  selectedElement: any = null;
  maxDescLength: number = 100;

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
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  // }
  toggleExpand(element: any) {
    // Toggle the expanded state of the description text
    if (!element.expanded) {
      // If not expanded, set expanded to true
      element.expanded = true;
    } else {
      // If expanded, set expanded to false
      element.expanded = false;
    }
  }

  getDisplayName(column: string): string {
    return this.columnMapping[column] || column;
  }
  onEditClick(rowId: string): void {
    // Handle edit action here
    console.log('Edit row with ID:', rowId);
  }

  onDeleteClick(rowId: string): void {
    // Handle delete action here
    console.log('Delete row with ID:', rowId);
  }
}