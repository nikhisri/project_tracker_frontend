import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  roles = [
    { value: 'project manager', viewValue: 'Consultant' },
    { value: 'tester', viewValue: 'Engineer' },
    { value: 'developer', viewValue: 'Operator' } 
  ];
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem("userRole")
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { role } = this.loginForm.value;
      const selectedRole = this.loginForm.get('role')?.value;
      console.log('Selected Role:', selectedRole);
      // Save role to local storage
      localStorage.setItem('userRole', role);
      // Navigate to dashboard or another page
      this.router.navigate(['/dashboard']);
    }
  }
}
