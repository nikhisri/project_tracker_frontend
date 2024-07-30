import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    if (this.projectForm?.valid) {
      console.log('Form Submitted!', this.projectForm.value);
    }
  }
  
}

