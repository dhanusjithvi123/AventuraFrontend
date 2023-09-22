import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/componets/users/emitter/emitter';
import { UserServiceService } from 'src/app/Services/user/user-service.service';
import { EventDetailsDialogComponent } from '../EventDetailsDialogComponent';
import { NgxSpinnerService} from "ngx-spinner";


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

  constructor(private http: HttpClient, private userService: UserServiceService,private dialog: MatDialog,private router: Router,private spinner:  NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show(); // Show the loading spinner

    // Simulate a 5-second delay
    setTimeout(() => {
      const token = this.userService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http
          .get('http://localhost:5000/user', { headers, withCredentials: true })
          .subscribe(
            (res: any) => {
              this.message = `Hi ${res.firstName}`;
              Emitters.authEmitter.emit(true);
            },
            (err) => {
              this.message = 'You are not logged in';
              Emitters.authEmitter.emit(false);
            }
          )
          .add(() => {
            this.loading = false;
          });
      } else {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    }, 5000); // Simulated delay of 5 seconds

    // Fetch events after the loading spinner is shown
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.http.get<any>('http://localhost:5000/usereventlist').subscribe(
      (res: any) => {
        console.log(res);
        this.events = res;
        this.spinner.hide(); // Hide the loading spinner when the HTTP request is complete
      },
      (err) => {
        console.error(err);
        this.spinner.hide(); // Hide the loading spinner in case of an error
      }
    );
  }

  getImageUrl(event: EventData): string {
    const image = event.image[0];
    return image ? image.url : '';
  }

 
  booking(id: any) {
    console.log(id);
    this.router.navigate(['/booking', id]);
}

  openEventDetailsDialog(event: EventData): void {
    this.dialog.open(EventDetailsDialogComponent, {
      data: event,
    });
  }

}
