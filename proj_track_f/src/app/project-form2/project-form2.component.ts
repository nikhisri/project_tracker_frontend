import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

 
@Component({
  selector: 'app-project-form2',
  templateUrl: './project-form2.component.html',
  styleUrls: ['./project-form2.component.css']
}) 
export class ProjectForm2Component {
  projectForm!: FormGroup;
  isEditMode: boolean = false;
  projectStat:string[]=["Opened", "In-Progress", "Completed","Late"];
  minDate: Date;
  constructor(private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  )  { 
    this.minDate = new Date();

  }

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
      // console.log(projectData);
      if (this.isEditMode) {
        // Call update API
        this.api.post(`http://localhost:5000/v1/user/updateproj`, projectData).then((data: any) => {
          if (data && data.status === 'success') {
            console.log('Update successful', data);
             //Success
        Swal.fire({
          title: 'Success',
          text: 'Update successful',
          icon: 'success',
          timer:1500, 
          showConfirmButton:false
        })
          } else {
            console.log('Update failed');
              //Error
          Swal.fire({
            title: 'Error',
            text: 'Update unsuccessful',
            icon: 'error',//warning
            timer:1500, 
            showConfirmButton:false
          })
          }
         
        
        }).catch((error) => {
          console.log('Update error', error);
           //Error
         Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          timer:1500, 
          showConfirmButton:false
        })
        });
      } else {
        // Call create API
        this.api.post('http://localhost:5000/v1/user/project', projectData).then((data: any) => {
          console.log(data);
          if (data && data.status === 'success') {
            console.log('Post successful', data);
            Swal.fire({
              title: 'Success',
              text: 'Project creation successful',
              icon: 'success',
              timer:1500, 
              showConfirmButton:false
            })
          } else {
            console.log('Post failed');
            Swal.fire({
              title: 'Error',
              text: 'Project creation unsuccessful',
              icon: 'error',//warning
              timer:1500, 
              showConfirmButton:false
            })
          }
          
       
        }).catch((error) => {
          console.log('Post error', error);
          //Error
         Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          timer:1500, 
          showConfirmButton:false
        })
        });
      }
    }
  
  }
  formatDate(date: string): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }


  
}