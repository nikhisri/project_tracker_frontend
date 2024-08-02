import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent {
  issueForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private api: ApiService
  ) { }

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
      // console.log('Form Submitted!', this.issueForm.value);
      this.api.post('http://localhost:5000/v1/user/createissue', this.issueForm.value).then((data: any) => {
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
