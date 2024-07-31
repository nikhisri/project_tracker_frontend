import { Component, Input } from '@angular/core';

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
  @Input() dataSource: TableData[] = [];
  displayedColumns: string[] = [];
  

  ngOnInit(): void {
    this.determineDisplayedColumns();
  }
  
 allKeys:any;
  // Determine displayed columns dynamically based on the structure of the data
  determineDisplayedColumns(): void {
    if (this.dataSource.length > 0) {
      // Get all unique keys from the data
      
      this.allKeys = this.dataSource.reduce((keys, item) => {
        return keys['concat'](Object.keys(item));
      }, []);
      this.displayedColumns = Array.from(new Set(this.allKeys));
    }
 
  }

 
  // Check if a value is a string
  isString(value: any): boolean {
    return typeof value === 'string';
  }
  
}
