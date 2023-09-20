import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {
  loginForm: FormGroup;
  private _id: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  loginFormSubmit() {
    if (this.loginForm.valid) {
      this._id = localStorage.getItem('userId');
      const formData = this.loginForm.value;

      // Include userId as a URL parameter
      const url = `https://backend.aventuraevents.site/newpassword/${this._id}`;
      const body = { password: formData.password };

      this.http.put(url, body, { withCredentials: true }).subscribe(
        (result: any) => {
          console.log(result);
          
          if (result.message === 'Password updated successfully') {
            Swal.fire('Success', 'Password changed successfully!', 'success').then(() => {
              this.router.navigate(['login']);
            });
          } else if (result.message === 'Access denied. User is blocked.') {
            Swal.fire('Blocked', 'Your account is blocked. Please contact the administrator.', 'error');
          } else {
            Swal.fire('Error', 'Password change failed!', 'error');
          }
        },
        (error) => {
          Swal.fire('Error', 'Password change failed!', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      this.loginForm.markAllAsTouched();
    }
  }
}
