import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent {
  ActionForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    }
  }
}
