import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent implements OnInit {
  actionForm!: FormGroup; // Fixed the casing to match Angular conventions

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.actionForm = this.fb.group({
      project_id: ['', Validators.required],
      action_id: ['', Validators.required],
      issue_id: ['', Validators.required],
      action_desc: ['', Validators.required],
      action_owner: ['', Validators.required],
      action_status: ['', Validators.required],
      target_date: ['', Validators.required],
      remarks: ['']
    });
  }

  onSubmit(): void {
    if (this.actionForm.valid) {
      console.log('Form Submitted!', this.actionForm.value);
      this.api.post('http://localhost:5000/v1/user/createAction', this.actionForm.value)
        .then((data: any) => {
          console.log('Post successful', data);
          // Optionally, handle success feedback to the user here
        })
        .catch((error: any) => {
          console.log('Post error', error);
          // Optionally, handle error feedback to the user here
        });
    } else {
      // Optionally, handle form errors feedback to the user here
      console.log('Form is invalid');
    }
  }
}
