import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Event {
  _id: string;
  eventName: string;
  features: string;
  eventRate: number;
  phone: number;
  image: { public_id: string; url: string }[]; // Updated property for the image
  status: boolean;
}

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'eventName',
    'features',
    'eventRate',
    'phone',
  ]; // Include the 'image' column
  dataSource: MatTableDataSource<Event>;

  constructor(private http: HttpClient, private router: Router) {
    this.dataSource = new MatTableDataSource<Event>([]);
  }

  ngOnInit(): void {
    const organisaerId = localStorage.getItem('organisaerId');

    this.http
      .get<any>(`http://www.backend.aventuraevents.site/organisaer/eventlist/${organisaerId}`)
      .subscribe(
        (response) => {
          console.log(response.events);
          this.dataSource.data = response.events;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getImageUrl(event: Event): string {
    // Assuming you only have one image, use the first image in the array
    const image = event.image[0];
    return image ? image.url : ''; // Return the URL of the first image, or an empty string if no image
  }

  navigateToEdit(id: any) {
    console.log('hiii');

    this.router.navigate([`/editevent/${id}`]);
  }

  toggleStatus(eventId: string, currentStatus: boolean): void {
    // Prepare the request payload
    const requestPayload = {
      eventId: eventId,
      status: !currentStatus // Toggle the status (block if unblocked, unblock if blocked)
    };
  
    // Send the request to the backend
    this.http.put<any>(`http://www.backend.aventuraevents.site/organisaer/eventblocking/${eventId}`, requestPayload).subscribe(
      (response) => {
        console.log('Status updated successfully!', response);
  
        // If the status was successfully updated, update the status locally in the dataSource
        const updatedEvent = this.dataSource.data.find(event => event._id === eventId);
        if (updatedEvent) {
          updatedEvent.status = !currentStatus;
        }
      },
      (error) => {
        console.error('Failed to update status!', error);
      }
    );
  }
  
}
