import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { bookingsaddress } from '../bookingsaddress';



 interface BookedList {
  Qtystatus: boolean;
  Status: string;
  createdAt: string;
  email: string;
  eventId: {
    _id: string;
    organisaerId: string;
    eventName: string;
    isBooked: boolean;
    eventRate: number;
    image: { public_id: string; url: string }[];
    // Add other properties from eventId here
  };
  isPaid: boolean;
  mobile: number;
  name: string;
  orderId: string;
  organisaerId: string;
  updatedAt: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    // Add other properties from userId here
  };
  useraddress: string;
  __v: number;
  _id: string;
  // Add other properties from the response here
}


@Component({
  selector: 'app-organiserbookinglist',
  templateUrl: './organiserbookinglist.component.html',
  styleUrls: ['./organiserbookinglist.component.css']
})
export class OrganiserbookinglistComponent implements OnInit {
  displayedColumns: string[] = ['image', 'eventName', 'phone'];

  dataSource: MatTableDataSource<BookedList>;

  constructor(private http: HttpClient, private router: Router,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<BookedList>([]);
  }

  ngOnInit(): void {
    const organisaerId = localStorage.getItem('organisaerId');

    this.http
      .get<any>(`http://localhost:5000/organisaer/bookedlist/${organisaerId}`)
      .subscribe(
        (response) => {
          console.log(response);
          this.dataSource.data = response.bookedList;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  navigateToViewMore(orderId: string) {
    console.log(orderId);
    
    this.router.navigate(['/view-more', orderId]);
  }

  openEventDetailsDialog(booking: BookedList): void {
    this.dialog.open(bookingsaddress, {
      data: booking,
    });
  }
  
}
