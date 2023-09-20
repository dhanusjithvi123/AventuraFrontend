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
    this.http.get<any>('https://backend.aventuraevents.site/userorganisaerList').subscribe(
      (res: any) => {
        
        this.organiser= res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  searchText: string = '';


  onSearchTextEntered(searchvalue : string){
    this.searchText = searchvalue;
    console.log(this.searchText);
    
  }

 
 
  booking(id: any) {
  this.router.navigate([`/booking/${id}`])
}



  // openEventDetailsDialog(event: EventData): void {
  //   this.dialog.open(EventDetailsDialogComponent, {
  //     data: event,
  //   });
  // }
}