import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService}  from  'src/app/Services/user/user-service.service'

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  forgotPasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private userService: UserServiceService,) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  forgotPasswordFormSubmit() {
    if (this. forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;
      this.http.post('http://www.backend.aventuraevents.site/forgotPasswordForm', formData).subscribe(
        (response) => {
          Swal.fire('Success', 'OTP  Successful Send!', 'success').then(
            () => {
              this.router.navigate(['/otp']);
            }
          );
        },
        (error) => {
          if (error?.error?.message === 'Email is already taken') {
            Swal.fire('Error', 'Email is already taken', 'error');
          } else {
            Swal.fire('Error', 'Registration failed!', 'error');
          }
        }
      );
    } else {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      this. forgotPasswordForm.markAllAsTouched();
    }
  }

}
