import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsDialogComponent } from '../EventDetailsDialogComponent';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'


export interface Organizer {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: number;
  email: string;
  address: string;
}

export interface EventData {
  _id: string;
  eventName: string;
  features: string;
  eventRate: number;
  phone: number;
  image: { public_id: string; url: string }[];
  organiserId: Organizer;
  isBooked: boolean; // Include the Organizer type here
}

@Component({
  selector: 'app-user-eventlisting',
  templateUrl: './user-eventlisting.component.html',
  styleUrls: ['./user-eventlisting.component.css'],
})
export class UserEventlistingComponent implements OnInit {
  events: EventData[] = [];


  noDataImagePath: string = '../assets/images/no_data-removebg-preview.png'
  noDataGif: string = ''

  constructor(private http: HttpClient, private dialog: MatDialog,private router: Router,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show(); // Show the loading spinner
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.http.get<any>('http://localhost:5000/usereventlist').subscribe(
      (res: any) => {
        
        this.events = res;
        this.spinner.hide();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  getImageUrl(event: EventData): string {
    const image = event.image[0];
    return image ? image.url : '';
  }

 
  booking(id: any) {
  this.router.navigate([`/booking/${id}`])
}

  openEventDetailsDialog(event: EventData): void {
    this.dialog.open(EventDetailsDialogComponent, {
      data: event,
    });
  }

  searchText: string = '';


  onSearchTextEntered(searchvalue : string){
    this.searchText = searchvalue;
    console.log(this.searchText);
    
  }
}
