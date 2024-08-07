import { Component ,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent {

  issueForm!: FormGroup;
  isEditMode: boolean = false;
  minDate: Date;


  constructor(private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) { 
    this.minDate = new Date();

  }


  ngOnInit(): void {
    this.isEditMode = !!this.data.issue_id;
    this.issueForm = this.fb.group({
      project_id: [{ value: this.data.project_id || '', disabled: this.isEditMode }, Validators.required],
      project_name: [this.data.project_name || '', Validators.required],
      action_owner: [this.data.action_owner || '', Validators.required],
      action_Owner_dept: [this.data.action_Owner_dept || '', Validators.required],
      issue_desc: [this.data.issue_desc || '', Validators.required],
      issueRaiseddate: [this.formatDate(this.data.issueRaiseddate) || '', Validators.required],
      // issuetargetDate: [this.formatDate(this.data.issuetargetDate) || '', Validators.required],
      targetDate: [this.formatDate(this.data.targetDate) || '', Validators.required],
      issue_id: [{ value: this.data.issue_id || '', disabled: this.isEditMode }, Validators.required],
      owner_Id: [{ value: this.data.owner_Id || '', disabled: this.isEditMode }, Validators.required],
      issue_Status: [this.data.issue_Status || '', Validators.required],
      remarks: [this.data.remarks || '']
    });
  }

//   onSubmit(): void {
//     if (this.issueForm?.valid) {
//       // console.log('Form Submitted!', this.issueForm.value);
//       this.api.post('http://localhost:5000/v1/user/createissue', this.issueForm.value).then((data: any) => {
//         if (data) {
//           console.log('Post successful', data);
//         } else {
//           console.log('Post failed');
//         }
//       }).catch((error) => {
//         console.log('Post error', error);
//       });
//     }
//   }
// }
onSubmit(): void {
  if (this.issueForm?.valid) {
    const projectData = this.issueForm.getRawValue(); // getRawValue to include disabled fields

    if (this.isEditMode) {
      // Call update API
      this.api.post(`http://localhost:5000/v1/user/updateissue`, projectData).then((data: any) => {
        if (data) {
          console.log('Update successful', data);
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
      //Success

      Swal.fire({
        title: 'Success',
        text: 'Update successful',
        icon: 'success',
        timer:1500, 
        showConfirmButton:false
      })

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
      this.api.post('http://localhost:5000/v1/user/createissue', projectData).then((data: any) => {
        if (data) {
          console.log('Post successful', data);
        } else {
          console.log('Post failed');
          Swal.fire({
            title: 'Error',
            text: 'Issue creation unsuccessful',
            icon: 'error',//warning
            timer:1500, 
            showConfirmButton:false
          })
          
        }

         //Success
         Swal.fire({
          title: 'Success',
          text: 'Issue creation successful',
          icon: 'success',
          timer:1500, 
          showConfirmButton:false
        })

      }).catch((error) => {
        console.log('Post error', error);
        //error
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

