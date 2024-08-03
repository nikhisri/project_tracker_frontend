import { Component, OnInit , Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data.project_id;
    this.projectForm = this.fb.group({
      // project_id: [this.data.project_id || '', Validators.required],
      
      project_id: [{ value: this.data.project_id || '', disabled: this.isEditMode }, Validators.required],
      project_name: [this.data.project_name || '', Validators.required],
      project_desc: [this.data.project_desc || '', Validators.required],
      project_start_Date: [this.formatDate(this.data.project_start_Date) || '', Validators.required],
      actual_start_Date: [this.formatDate(this.data.actual_start_Date) || '', Validators.required],
      planned_end_Date: [this.formatDate(this.data.planned_end_Date) || '', Validators.required],
      actual_end_Date: [this.formatDate(this.data.actual_end_Date) || '', Validators.required],
      revised_Completion_date_1: [this.formatDate(this.data.revised_Completion_date_1) || '', Validators.required],
      revised_Completion_date_2: [this.formatDate(this.data.revised_Completion_date_2) || '', Validators.required],
      required_No_days: [this.data.required_No_days || '', Validators.required],
      action_owner: [{value:this.data.action_owner || '',disabled: this.isEditMode}, Validators.required],
      action_Owner_dept: [this.data.action_Owner_dept || '', Validators.required],
      project_Status: [this.data.project_Status || '', Validators.required],
      owner_Id: [{value:this.data.owner_Id || '',disabled: this.isEditMode}, Validators.required],
      remarks: [this.data.remarks || '']
    });
  }
  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.getRawValue(); // getRawValue to include disabled fields

      if (this.isEditMode) {
        // Call update API
        this.api.post(`http://localhost:5000/v1/user/updateproj`, projectData).then((data: any) => {
          if (data) {
            console.log('Update successful', data);
          } else {
            console.log('Update failed');
          }
        }).catch((error) => {
          console.log('Update error', error);
        });
      } else {
        // Call create API
        this.api.post('http://localhost:5000/v1/user/project', projectData).then((data: any) => {
          if (data) {
            console.log('Post successful', data);
          } else {
            console.log('Post failed');
            
          }
        }).catch((error) => {
          console.log('Post error', error);
        });
      }
    }
  
  }
  formatDate(date: string): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }
}