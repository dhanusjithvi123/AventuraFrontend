import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Organisaer {
  _id: string; // Add the _id property
  name: string;
  email: string;
  phoneNumber: string;
  status: boolean;
}


@Component({
  selector: 'app-organisaer-admin',
  templateUrl: './organisaer-admin.component.html',
  styleUrls: ['./organisaer-admin.component.css']
})
export class OrganisaerAdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'status'];
  organisaers: Organisaer[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Organisaer[]>('http://www.backend.aventuraevents.site/organisaer/organisaerList').subscribe(
      (response) => {
        this.organisaers = response;
        console.log();
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleStatus(organiser: Organisaer): void {
    organiser.status = !organiser.status;
    const organiserId = organiser._id; // Use the _id field instead of organiserId
    console.log(organiserId);
    
    this.http.put(`http://localhost:5000/organisaer/blocking/${organiserId}`, organiser).subscribe(
      (response) => {
        Swal.fire('Success', 'Organiser Block successful!', 'success')
      },
      (error) => {
        console.error('Failed to update status:', error);
      }
    ); 
  }
  
  
}
