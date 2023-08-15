import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';



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
  selector: 'app-event-details-dialog',
  template: `
    <div class="event-dialog-content">
      <h2 class="event-dialog-title">{{ data.eventId.eventName }}</h2>
      <img
        class="event-dialog-image"
        [src]="getFirstImageUrl()"
        alt="Event Image"
        style="max-height: 100px; max-width: 100px;"
      />
      <p class="event-dialog-eventRate">
        Event Rate: {{ data.eventId.eventRate }}
      </p>
      <p class="event-dialog-features">
        User Name: {{ data.userId.firstName }}{{ data.userId.lastName }}
      </p>
      <p class="event-dialog-phone">User Phone: {{ data.userId.phone }}</p>
      <!-- Add organizer details here -->
      <p class="event-dialog-organiser">User Address: {{ data.useraddress }}</p>
      <p class="event-dialog-company">Order Status: {{ data.Status }}</p>

      <!-- Add more content here -->
      <div class="event-dialog-buttons">
  <button mat-raised-button class="mat-primary" (click)="finishupdateStatus('finished', data._id)" [disabled]="data.Status === 'canceled'">Finish Booking</button>
  <button mat-raised-button class="mat-warn" (click)="canceledupdateStatus('canceled', data._id)" [disabled]="data.Status === 'Finish'">Cancel Booking</button>
</div>


      <button mat-button class="event-dialog-close-btn" (click)="closeDialog()">
        Close
      </button>
    </div>
  `,
  styles: [
    `
      .event-dialog-content {
        padding: 20px;
        max-width: 400px;
      }

      .event-dialog-title {
        font-size: 24px;
        font-weight: bold;
      }

      .event-dialog-features {
        font-size: 16px;
        margin-top: 10px;
      }

      .event-dialog-close-btn {
        margin-top: 20px;
      }
      .event-dialog-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }

      button.mat-raised-button.primary {
        background-color: green;
      }

      button.mat-raised-button.warn {
        background-color: red;
        color: white;
      }
    `,
  ],
})
export class bookingsaddress {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookedList,
    public dialogRef: MatDialogRef<bookingsaddress>,
    private http: HttpClient
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  getFirstImageUrl(): string {
    const image = this.data.eventId.image[0];
    return image ? image.url : '';
  }

 canceledupdateStatus(newStatus: string, bookingId: string): void {
  this.http
    .put<any>(`http://www.backend.aventuraevents.site/organisaer/cancelBooking/${bookingId}`, {})
    .subscribe(
      (response) => {
        Swal.fire('Success', 'Booking has been canceled!', 'success').then(() => {
          window.location.reload();
        });
      },
      (error) => {
        Swal.fire('Error', 'Failed to cancel booking.', 'error');
        console.error(`Error cancelling booking with ID: ${bookingId}`);
      }
    );
}

finishupdateStatus(newStatus: string, bookingId: string): void {
  this.http
    .put<any>(`hhttp://www.backend.aventuraevents.site/organisaer/finiashBooking/${bookingId}`, {})
    .subscribe(
      (response) => {
        Swal.fire('Success', 'Booking has been finished!', 'success').then(() => {
          window.location.reload();
        });
      },
      (error) => {
        Swal.fire('Error', 'Failed to finish booking.', 'error');
        console.error(`Error finishing booking with ID: ${bookingId}`);
      }
    );
}

}
