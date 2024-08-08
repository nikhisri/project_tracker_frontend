import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent {
  actionForm!: FormGroup;
  isEditMode: boolean = false;
  projectIds:string[]=[];
  issueIds:string[]=[];
  actionstatus:string[]=["Opened", "In-Progress", "Closed"];
  minDate: Date;


  constructor(private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    { 
      this.minDate = new Date();
  
    }
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data.action_id;
    this.actionForm = this.fb.group({
      project_id: [{ value: this.data.project_id || '', disabled: this.isEditMode }, Validators.required],
      action_id: [{ value: this.data.action_id || '', disabled: this.isEditMode }, Validators.required],
      issue_id: [{ value: this.data.issue_id || '', disabled: this.isEditMode }, Validators.required],
      // issue_id: [this.data.issue_id || '', Validators.required],
      action_desc: [this.data.action_desc || '', Validators.required],
      action_owner: [this.data.action_owner || '', Validators.required],
      action_status: [this.data.action_status || '', Validators.required],
      target_date: [this.formatDate(this.data.target_date) || '', Validators.required],
      remarks: [this.data.remarks || '']
    });
    this.getproject();
    this.getissue();

  }

 
  onSubmit(): void {
    if (this.actionForm.valid) {
      const projectData = this.actionForm.getRawValue(); // getRawValue to include disabled fields

      if (this.isEditMode) {
        // Call update API
        this.api.post(`http://localhost:5000/v1/user/updateactionbyid`, projectData).then((data: any) => {
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
        this.api.post('http://localhost:5000/v1/user/createAction', projectData).then((data: any) => {
          if (data && data.status === 'success') {
            console.log('Post successful', data);
            //Success
        Swal.fire({
          title: 'Success',
          text: 'Action creation successful',
          icon: 'success',
          timer:1500, 
          showConfirmButton:false
        })
          } else {
            console.log('Post failed');
            //warning
            Swal.fire({
              title: 'Error',
              text: 'ACtion creation unsuccessful',
              icon: 'error',
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

  getproject() {
    this.api.get('http://localhost:5000/v1/user/allprojectids').then((data: any) => {
      if (data) {
        console.log(data);
        this.projectIds = data.data;
      
      } else {
        console.log('Not Found');
  
      }
    }).catch((error) => {
        console.log('Error getting ids', error);
    });
  }  
  getissue() {
    this.api.get('http://localhost:5000/v1/user/allissueids').then((data: any) => {
      if (data) {
        console.log(data);
        this.issueIds = data.data;
      
      } else {
        console.log('Not Found');
  
      }
    }).catch((error) => {
        console.log('Error getting ids', error);
    });
  }  
}
