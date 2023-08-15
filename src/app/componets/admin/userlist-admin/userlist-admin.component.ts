
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: boolean;
}

@Component({
  selector: 'app-userlist-admin',
  templateUrl: './userlist-admin.component.html',
  styleUrls: ['./userlist-admin.component.css']
})
export class UserlistAdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'status'];
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<User[]>('http://www.backend.aventuraevents.site/users').subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleStatus(user: User): void {
    user.status = !user.status;
    const userId = user._id; // Use the _id field instead of organiserId
    console.log(userId );
    
    this.http.put(`http://www.backend.aventuraevents.site/blocking/${userId }`, user ).subscribe(
      (response) => {
        Swal.fire('Success', 'User Block successful!', 'success')
     
      },
      (error) => {
        console.error('Failed to update status:', error);
      }
    ); 
  }
  logout(): void {
    this.http.post('http://www.backend.aventuraevents.site/admin/logout', {}).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/adminlogin']);
    });
  }
}