import { HttpClient } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list'
import { Component } from '@angular/core';
 

@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']

})

export class LoginComponent {

  username: string = '';

  password: string = '';

  private apiUrl = 'http://localhost:5000/v1/user/loginuser';

  constructor(private http: HttpClient) { }
 

  onLogin() {

    // Handle login logic here

    console.log('Username:', this.username);

    console.log('Password:', this.password);

    try{

        const credentials = {

          email: this.username,

          password: this.password

        };

        this.http.post(this.apiUrl, credentials).subscribe(response => 

          {console.log('POST request successful', response);

            if(response){

              localStorage.setItem("userDetails",JSON.stringify(response));

            }

        },      

        error => {console.error('Error in POST request', error); } );

    }catch(err:any){

      console.log(err);

    }

  }

//   onRegister() {

//     // Handle registration navigation or logic here

//     console.log('Redirect to registration page');

// }

}
 
