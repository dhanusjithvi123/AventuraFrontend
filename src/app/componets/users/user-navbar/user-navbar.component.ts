import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/componets/users/emitter/emitter';
import { HttpHeaders } from '@angular/common/http';
import { UserServiceService } from 'src/app/Services/user/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  authenticated = false;
  message!: string;
  _id: string | null | undefined;

  constructor(
    private http: HttpClient,
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the user ID from local storage
    this._id = localStorage.getItem('userId') ?? null;
    console.log( this._id );
    
  }

  navigateToProfile(): void {
    console.log('hiii');
    // Pass the _id property to navigate to the profile editing page
    this.router.navigate([`/profile/${this._id}`]);
  }

  logout() {
    // Remove the JWT token and adminId from localStorage or perform any other logout actions
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userId'); // Assuming you store the admin's ID as 'adminId'
    
    // Optionally clear other admin-related data from localStorage
    // Redirect to the login page or any other desired route
    this.router.navigate(['login']); // Replace 'login' with your login route
  }
  
}
