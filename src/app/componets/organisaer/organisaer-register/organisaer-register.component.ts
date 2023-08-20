import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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

@Component({
  selector: 'app-organisaer-register',
  templateUrl: './organisaer-register.component.html',
  styleUrls: ['./organisaer-register.component.css']
})
export class OrganisaerRegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/), positiveNumberValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordConfirmationValidator
    });
  }

  ngOnInit() {}

  signUpSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.http.post('https://backend.aventuraevents.site/organisaer/organisaerregister', formData).subscribe(
        (response) => {
          Swal.fire('Success', 'Registration successful!', 'success').then(() => {
            this.router.navigate(['/organisaerlogin']);
          });
        },
        (error) => {
          Swal.fire('Error', 'Registration failed!', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      this.signupForm.markAllAsTouched();
    }
  }

  get signUpControl() {
    return this.signupForm.controls;
  }

  passwordConfirmationValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (
      passwordControl && confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
}
