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
  verfiy: boolean;
}

@Component({
  selector: 'app-organiser-request',
  templateUrl: './organiser-request.component.html',
  styleUrls: ['./organiser-request.component.css']
})
export class OrganiserRequestComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'status' ,'verfiy'];
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<User[]>('https://backend.aventuraevents.site/organisaer/organisaerRequestList').subscribe(
      (response) => {
        console.log(response);
        
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
    
    this.http.put(` }`, user ).subscribe(
      (response) => {
        Swal.fire('Success', 'User Block successful!', 'success')
     
      },
      (error) => {
        console.error('Failed to update status:', error);
      }
    ); 
  }

  toggleVerify(user: User): void {
    user.verfiy = !user.verfiy;
    const userId = user._id;
  
    this.http.put(`https://backend.aventuraevents.site/organisaer/verfiyconfrom/${userId}`, user).subscribe(
      (response) => {
        Swal.fire('Success', 'User Verification updated!', 'success');
      },
      (error) => {
        console.error('Failed to update verification:', error);
      }
    );
  }
  
}
