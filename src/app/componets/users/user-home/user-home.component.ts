import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/componets/users/emitter/emitter';
import { HttpHeaders } from '@angular/common/http';
import { UserServiceService } from 'src/app/Services/user/user-service.service'
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsDialogComponent } from '../EventDetailsDialogComponent';
import { Router } from '@angular/router'

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
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  events: EventData[] = [];
  authenticated = false;
  message!: string;
  loading = false; // Add a loading state property
  progressPercentage = 0; // Progress percentage for the progress bar

  constructor(private http: HttpClient, private userService: UserServiceService,private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
    const token = this.userService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.loading = true;

      this.http.get('https://backend.aventuraevents.site/user', { headers, withCredentials: true })
        .subscribe(
          (res: any) => {
            this.message = `Hi ${res.firstName}`;
            Emitters.authEmitter.emit(true);
          },
          (err) => {
            this.message = "You are not logged in";
            Emitters.authEmitter.emit(false);
          }
        )
        .add(() => {
          this.loading = false;
        });
    } else {
      this.message = "You are not logged in";
      Emitters.authEmitter.emit(false);
    }
  }

  fetchEvents(): void {
    this.http.get<any>('https://backend.aventuraevents.site/usereventlist').subscribe(
      (res: any) => {
        console.log(res);
        
        this.events = res;
        
      },
      (err) => {
        console.error(err);
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

}
