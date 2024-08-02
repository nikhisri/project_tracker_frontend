import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-project-form2',
  templateUrl: './project-form2.component.html',
  styleUrls: ['./project-form2.component.css']
})
export class ProjectForm2Component {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      project_id: ['', Validators.required],
      project_name: ['', Validators.required],
      project_desc: ['', Validators.required],
      project_start_Date: ['', Validators.required],
      actual_start_Date: ['', Validators.required],
      planned_end_Date: ['', Validators.required],
      actual_end_Date: ['', Validators.required],
      revised_Completion_date_1: ['', Validators.required],
      revised_Completion_date_2: ['', Validators.required],
      required_No_days: ['', Validators.required],
      action_owner: ['', Validators.required],
      action_Owner_dept: ['', Validators.required],
      project_Status: ['', Validators.required],
      owner_Id: ['', Validators.required],
      remarks: ['']
    });
  
  }


  onSubmit(): void {
    if (this.projectForm.valid) {
      this.api.post('http://localhost:5000/v1/user/project', this.projectForm.value).then((data: any) => {
        if (data) {
          
          console.log('Post successful', data);
        } else {
          console.log('Post failed');
            //Error
          Swal.fire({
            title: 'Error',
            text: 'Project creation unsuccessful',
            icon: 'error',//warning
            timer:1500, 
            showConfirmButton:false
          })
        }
        //Success
        Swal.fire({
          title: 'Success',
          text: 'Project creation successful',
          icon: 'success',
          timer:1500, 
          showConfirmButton:false
        })
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
