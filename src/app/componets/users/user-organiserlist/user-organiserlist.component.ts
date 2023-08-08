import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsDialogComponent } from '../EventDetailsDialogComponent';
import { Router } from '@angular/router';


export interface Organizer {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: number;
  email: string;
  address: string;
}

@Component({
  selector: 'app-user-organiserlist',
  templateUrl: './user-organiserlist.component.html',
  styleUrls: ['./user-organiserlist.component.css']
})

export class UserOrganiserlistComponent implements OnInit {
  organiser: Organizer[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }


  fetchEvents(): void {
    this.http.get<any>('http://localhost:5000/userorganisaerList').subscribe(
      (res: any) => {
        this.organiser= res;
      },
      (err) => {
        console.error(err);
      }
    );
  }


  // getImageUrl(event: EventData): string {
  //   const image = event.image[0];
  //   return image ? image.url : '';
  // }

 
  booking(id: any) {
  this.router.navigate([`/booking/${id}`])
}


  // openEventDetailsDialog(event: EventData): void {
  //   this.dialog.open(EventDetailsDialogComponent, {
  //     data: event,
  //   });
  // }
}