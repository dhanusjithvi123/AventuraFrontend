import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user/user-service.service';

@Component({
  selector: 'app-user-otppage',
  templateUrl: './user-otppage.component.html',
  styleUrls: ['./user-otppage.component.css']
})
export class UserOtppageComponent {
  OTPForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private userService: UserServiceService,) {
    this.OTPForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  otpFormSubmit() {
    if (this.OTPForm.valid) {
      const formData = this.OTPForm.value;
      this.userService.userotp(formData.otp).subscribe(
        (response: any) => {
          if (response.message === 'success') {
            // Handle success case
            Swal.fire('Success', 'CORRECT OTP!', 'success').then(() => {
              this.router.navigate(['/login']);
            });
          } else {
            // Handle failure case
            Swal.fire('Error', 'WRONG OTP!', 'error');
          }
        },
        (error: any) => {
          Swal.fire('Error', 'Failed to verify OTP!', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please enter a 6-digit OTP', 'error');
      this.OTPForm.markAllAsTouched();
    }
  }
  

}
