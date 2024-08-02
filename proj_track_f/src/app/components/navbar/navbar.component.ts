import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router) { }
  logout():void {
    localStorage.removeItem("userRole")
    this.navigateURL('')
  }
  navigateURL(routepath: any) {
    this.router.navigate(["/"+routepath])
    }
}
