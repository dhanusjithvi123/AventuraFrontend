import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
declare var Razorpay: any;

export interface EventData {
  _id: string;
  eventName: string;
  features: string;
  eventRate: number;
  phone: number;
  image: { public_id: string; url: string }[];
  organisaerId: Organizer; // Include the Organizer type here
}

export interface Organizer {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: number;
  email: string;
  address: string;
}

function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value < 0) {
      return { negativeNumber: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css'],
})
export class UserBookingComponent implements OnInit {
  data: EventData = {
    _id: '',
    eventName: '',
    features: '',
    eventRate: 0,
    phone: 0,
    image: [],
    organisaerId: {
      _id: '',
      firstName: '',
      lastName: '',
      companyName: '',
      phone: 0,
      email: '',
      address: '',
    },
  };

  id: any;
  userForm!: FormGroup; // Add the ! symbol to indicate it will be initialized later
  isFormSubmitted = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  private razorpayResponse: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchEvents();

    // Initialize the userForm in ngOnInit
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      userphone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
          positiveNumberValidator(),
        ],
      ],
      useraddress: ['', Validators.required],
    });
  }

  fetchEvents(): void {
    this.http.get<any>(`http://localhost:5000/booking/${this.id}`).subscribe(
      (res: any) => {
        this.data = res;
        console.log(res);
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

  // Function to check if the form is valid
  isFormValid(): boolean {
    // Check if the form is valid using the form property
    if (this.userForm.invalid) {
      return false;
    }
    return true;
  }

  submitForm(): void {
    // Mark the form as submitted
    this.isFormSubmitted = true;

    // Check if the form is valid before proceeding
    if (!this.isFormValid()) {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      return;
    }

    // Generate a random orderId
    const orderId = 'OD' + Math.floor(Math.random() * Date.now());

    // Get the user-entered form data
    const formData = {
      ...this.userForm.value,
      eventRate: this.data.eventRate,
      orderId: orderId,
    };

    console.log(formData);

    // Implement your form submission logic here
    // For example, you can send the form data to the backend using HttpClient.post()
    // ... (previous code)
    this.http
      .post<any>('http://localhost:5000/submit_booking', formData)
      .subscribe(
        (res: any) => {
          console.log('Form submitted successfully!', res);

          // Handle the response and open the Razorpay interface
          if (res.success && res.data && res.data.id) {
            // Update 'res.id' to 'res.data.id'
            const razorpayOptions = {
              key: 'rzp_test_JIKK9QptO5LqSc',
              amount: res.data.amount, // Amount in paise (smallest currency unit)
              currency: 'INR',
              name: 'Aventura Events', // Your organization name
              description: 'Event Booking Payment',
              order_id: res.data.id, // Update 'res.id' to 'res.data.id'
              handler: (response: any) => {
                // This function will be called when the payment is successful
                console.log('Payment successful!', response);

                this.razorpayResponse = response;
                // Implement further logic here, e.g., navigating to a success page
                this.sendUserDataAndEventDetails(); 
                
              },
              prefill: {
                name: 'ram',
                email: 'DDhanus@gmail.com',
                contact: '12345678990',
              },
            };

            // Open the Razorpay payment interface
            const rzp = new Razorpay(razorpayOptions);
            rzp.open();
          } else {
            // Handle the case when the backend response does not contain the required data
            console.error(
              'Failed to create order or missing data in response.'
            );
          }
        },
        (err) => {
          console.error('Form submission failed!', err);
          // Optionally, you can display an error message to the user
        }
      );
  }
  sendUserDataAndEventDetails(): void {
    // Get the user-entered form data
    console.log('Form Group Values:', this.userForm.value);

    const userData = {
      username: this.userForm.value.username,
      useremail: this.userForm.value.useremail,
      userphone: this.userForm.value.userphone,
      useraddress: this.userForm.value.useraddress,
    };
  
    // Get the event data
    const eventData = {
      response: this.razorpayResponse,
      eventId: this.data._id,
      eventName: this.data.eventName,
      features: this.data.features,
      eventRate: this.data.eventRate,
      phone: this.data.phone,
      
    };
  
    const id = localStorage.getItem('userId')
    console.log("userid"+id);
    
    // Send the data to the backend API
    this.http.post<any>('http://localhost:5000/paymetcomformsend', {
      orderId: this.razorpayResponse.razorpay_order_id.toString(),
      name: this.userForm.value.username,
      email: this.userForm.value.useremail,
      mobile: this.userForm.value.userphone,
      useraddress: this.userForm.value.useraddress,
      eventId: this.data._id,
      eventName: this.data.eventName,
      organisaerId: this.data.organisaerId._id,
      userId:id
    }).subscribe(
      (res: any) => {
        console.log('Data sent to backend successfully!', res);
        // Redirect to the event list page after successful payment and data submission
        this.router.navigate(['/event']);
      },
      (err) => {
        console.error('Failed to send data to backend!', err);
        // Optionally, you can display an error message to the user
      }
    );
  }
}
