import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Organizer {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: number;
  email: string;
  address: string;
}

export interface Event {
  _id: string;
  eventName: string;
  eventRate: number;

  image: { public_id: string; url: string }[];
  // Other event properties
}

export interface BookedData {
  _id: string;
  eventId: Event;
  organisaerId: Organizer;
  Status: string;

  // Other properties
}

@Component({
  selector: 'app-userbookinglist',
  templateUrl: './userbookinglist.component.html',
  styleUrls: ['./userbookinglist.component.css'],
})
export class UserbookinglistComponent implements OnInit {
  bookedlist: BookedData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.http
      .get<any>(`http://localhost:5000/userbookedevent/${userId}`)
      .subscribe(
        (response) => {
          console.log(response);
          this.bookedlist = response.bookedlist;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getImageUrl(event: BookedData): string {
    if (
      event &&
      event.eventId &&
      event.eventId.image &&
      event.eventId.image.length > 0
    ) {
      return event.eventId.image[0].url;
    }
    return ''; // Return a default URL or an empty string if image is not available
  }

  cancelBooking(bookingId: string, eventId: string): void {
    this.http.put<any>(`http://localhost:5000/cancelBooking/${bookingId}`, {})
      .subscribe(
        (response) => {
          console.log(`Cancelled booking with ID: ${bookingId}`);
          // You can now use the eventId to perform additional actions
          this.updateEventBookingStatus(eventId, false); // Set isBooking to false
          // Refresh your list of booked events if needed
        },
        (error) => {
          console.error(`Error cancelling booking with ID: ${bookingId}`);
        }
      );
  }
  
  updateEventBookingStatus(eventId: string, isBooking: boolean): void {
    const updateData = {
      isBooking: isBooking,
      // ... Other fields to update if needed
    };
  
    this.http.put<any>(`http://localhost:5000/updateEvent/${eventId}`, updateData)
      .subscribe(
        (response) => {
          console.log(`Updated event booking status for event ID: ${eventId}`);
          // Refresh your list of events or perform other actions
        },
        (error) => {
          console.error(`Error updating event booking status for event ID: ${eventId}`);
        }
      );
  }
  

}
