import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent {
  issueForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.issueForm = this.fb.group({
      project_id: ['', Validators.required],
      project_name: ['', Validators.required],
      action_owner: ['', Validators.required],
      issue_desc: ['', Validators.required],
      issueRaiseddate: ['', Validators.required],
      issuetargetDate: ['', Validators.required],
      
      targetDate: ['', Validators.required],
      issue_id: ['', Validators.required],
      issue_Status: ['', Validators.required],
      remarks: ['']
    });
  }

  onSubmit(): void {
    if (this.issueForm?.valid) {
      console.log('Form Submitted!', this.issueForm.value);
    }
  }
}
