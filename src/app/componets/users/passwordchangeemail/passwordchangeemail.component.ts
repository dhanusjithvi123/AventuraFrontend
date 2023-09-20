import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService}  from  'src/app/Services/user/user-service.service'

@Component({
  selector: 'app-passwordchangeemail',
  templateUrl: './passwordchangeemail.component.html',
  styleUrls: ['./passwordchangeemail.component.css']
})
export class PasswordchangeemailComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private userService: UserServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    
    });
  }


  loginFormSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.userService.userpasswordchanging(formData.email ).subscribe(
        (result: {  userId: any,message: string }) => {
          if (result.message === 'Success') {
            localStorage.setItem('userId', result.userId)
            Swal.fire('Success', 'Identified user successful!', 'success').then(() => {
              this.router.navigate(['newpassword']);
            });
          } else if (result.message === 'Access denied. User is blocked.') {
            Swal.fire('Blocked', 'Your account is blocked. Please contact the administrator.', 'error');
          } else {
            Swal.fire('Error', 'password changing failed!', 'error');
          }
        },
        (error) => {
          Swal.fire('Error', 'password changing  failed!', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      this.loginForm.markAllAsTouched();
    }
  }

}
