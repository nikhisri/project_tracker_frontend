import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent {
  actionForm!: FormGroup;
  isEditMode: boolean = false;


  constructor(private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data.action_id;

    this.actionForm = this.fb.group({
      project_id: [{ value: this.data.project_id || '', disabled: this.isEditMode }, Validators.required],
      action_id: [{ value: this.data.action_id || '', disabled: this.isEditMode }, Validators.required],
      issue_id: [this.data.issue_id || '', Validators.required],
      action_desc: [this.data.action_desc || '', Validators.required],
      action_owner: [this.data.action_owner || '', Validators.required],
      action_status: [this.data.action_status || '', Validators.required],
      target_date: [this.formatDate(this.data.target_date) || '', Validators.required],
      remarks: [this.data.remarks || '']
    });
  }

  // onSubmit(): void {
  //   if (this.actionForm?.valid) {
  //     console.log('Form Submitted!', this.actionForm.value);
  //     this.api.post('http://localhost:5000/v1/user/createAction', this.actionForm.value).then((data: any) => {
  //       if (data) {
  //         console.log('Post successful', data);
  //       } else {
  //         console.log('Post failed');
  //       }
  //     }).catch((error) => {
  //       console.log('Post error', error);
  //     });
  //   }
  // }
  onSubmit(): void {
    if (this.actionForm.valid) {
      const projectData = this.actionForm.getRawValue(); // getRawValue to include disabled fields

      if (this.isEditMode) {
        // Call update API
        this.api.post(`http://localhost:5000/v1/user/updateactionbyid`, projectData).then((data: any) => {
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
        this.api.post('http://localhost:5000/v1/user/createAction', projectData).then((data: any) => {
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
