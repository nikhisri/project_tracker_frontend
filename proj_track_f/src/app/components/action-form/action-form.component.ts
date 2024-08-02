import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent {
  ActionForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.ActionForm = this.fb.group({
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
    if (this.ActionForm?.valid) {
      console.log('Form Submitted!', this.ActionForm.value);
      this.api.post('http://localhost:5000/v1/user/createAction', this.ActionForm.value).then((data: any) => {
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
