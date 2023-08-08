import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Event {
  _id: string;
  eventName: string;
  features: string;
  eventRate: number;
  phone: number;
  image: { public_id: string; url: string }[];
  organisaerId?: OrganiserData; // Include the organisaerId property
}

interface OrganiserData {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: number;
  email: string;
  address: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-event-details-dialog',
  template: `
    <div class="event-dialog-content">
      <h2 class="event-dialog-title">{{ data.eventName }}</h2>
      <img class="event-dialog-image" [src]="getFirstImageUrl()" alt="Event Image" style="max-height: 100px; max-width: 100px;">
      <p class="event-dialog-features">Features: {{ data.features }}</p>
      <p class="event-dialog-eventRate">Event Rate: {{ data.eventRate }}</p>
      <p class="event-dialog-phone">Phone: {{ data.phone }}</p>
      <!-- Add organizer details here -->
      <p class="event-dialog-organiser">Organizer: {{ data.organisaerId?.firstName }} {{ data.organisaerId?.lastName }}</p>
      <p class="event-dialog-company">Company: {{ data.organisaerId?.companyName }}</p>
      <p class="event-dialog-email">Email: {{ data.organisaerId?.email }}</p>
      <p class="event-dialog-address">Address: {{ data.organisaerId?.address }}</p>
      <!-- Add more content here -->
      <button mat-button  class="event-dialog-close-btn" (click)="closeDialog()">Close</button>
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
    `,
  ],
})
export class EventDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event,
    public dialogRef: MatDialogRef<EventDetailsDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  getFirstImageUrl(): string {
    const image = this.data.image[0];
    return image ? image.url : '';
  }
}
