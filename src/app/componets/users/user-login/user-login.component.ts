import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService}  from  'src/app/Services/user/user-service.service'


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private userService: UserServiceService,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginFormSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.userService.userlogin(formData.email, formData.password).subscribe(
        (result: { token: any,userId: any, message: string }) => {
          if (result.message === 'Success') {
            this.userService.storeToken(result.token);
            localStorage.setItem('userId', result.userId)
            Swal.fire('Success', 'Login successful!', 'success').then(() => {
              this.router.navigate(['home']);
            });
          } else if (result.message === 'Access denied. User is blocked.') {
            Swal.fire('Blocked', 'Your account is blocked. Please contact the administrator.', 'error');
          } else {
            Swal.fire('Error', 'Login failed!', 'error');
          }
        },
        (error) => {
          Swal.fire('Error', 'Login failed!', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      this.loginForm.markAllAsTouched();
    }
  }
  
  forgotPassword(): void {
    this.router.navigate(['forgetpassword'])
  }
  
  
}

