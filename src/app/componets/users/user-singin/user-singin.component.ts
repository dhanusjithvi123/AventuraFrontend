import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value < 0) {
      return { negativeNumber: true };
    }
    return null;
  };
}

function noWhitespaceValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  return isWhitespace ? { whitespace: true } : null;
}

@Component({
  selector: 'app-user-singin',
  templateUrl: './user-singin.component.html',
  styleUrls: ['./user-singin.component.css'],
})
export class UserSinginComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
            positiveNumberValidator(),
          ],
        ],
        password: ['', [Validators.required, noWhitespaceValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordConfirmationValidator,
      }
    );
  }

  ngOnInit() {}

  signUpSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.http.post('https://backend.aventuraevents.site/register', formData).subscribe(
        (response) => {
          Swal.fire('Success', 'Registration successful!', 'success').then(
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
      this.signupForm.markAllAsTouched();
    }
  }

  passwordConfirmationValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  loginFormSubmit(): void {
    // Your login logic here

    // After successful login, navigate to a specific route
    this.router.navigate(['/login']); // Replace 'dashboard' with your desired route
  }
}
