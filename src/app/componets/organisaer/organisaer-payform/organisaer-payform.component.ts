import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganisaersService } from 'src/app/Services/organisaer/organisaers.service';

declare var Razorpay: any;

@Component({
  selector: 'app-organisaer-payform',
  templateUrl: './organisaer-payform.component.html',
  styleUrls: ['./organisaer-payform.component.css'],
})
export class OrganisaerPayformComponent {

  constructor(private http: HttpClient, private organisaers: OrganisaersService) {}

  paynow() {
    const RazorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 2000000,
      name: 'Aventura Events',
      key: 'rzp_test_JIKK9QptO5LqSc',
      prefill: {
        name: 'Dhanusjith',
        email: 'dhanusjith@gmail.com',
        phone: '8848463680'
      },
      theme: {
        color: '#3482AD'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    };
  
    const token: any = this.organisaers.getToken();
  
    const successCallback = (paymentid: any) => {
  
      this.http.post('/organisaer/payrent',token )
        .subscribe(
          (response) => {
            console.log('Payment success:', response);
            // Update user as paid or perform other actions
          },
          (error) => {
            console.error('Payment error:', error);
            // Handle payment error
          }
        );
    };
  
    const failureCallback = (e: any) => {
      console.log(e);
      // Handle payment failure
    };
  
    // Call Razorpay API with error handling
    try {
      Razorpay.open(RazorpayOptions, successCallback, failureCallback);
    } catch (error) {
      console.error('Razorpay API error:', error);
      // Handle Razorpay API error
    }
  }
  

}
