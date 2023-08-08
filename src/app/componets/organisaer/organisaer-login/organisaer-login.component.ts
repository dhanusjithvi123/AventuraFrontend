import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrganisaersService } from 'src/app/Services/organisaer/organisaers.service';
import { Router } from '@angular/router'; // Import Router module
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organisaer-login',
  templateUrl: './organisaer-login.component.html',
  styleUrls: ['./organisaer-login.component.css']
})
export class OrganisaerLoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private organisaerService: OrganisaersService, // Inject OrganisaersService
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {}

  validaEmail(email: string): boolean {
    const validRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return validRegex.test(email);
  }
  
  onFormSubmit(): void {
    if (this.form) {
      const admin = this.form.getRawValue();
  
      if (admin.email === '' || admin.password === '') {
        Swal.fire('Error', 'Please enter all the fields', 'error');
      } else if (!this.validaEmail(admin.email)) {
        Swal.fire('Error', 'Please enter a valid email', 'error');
      } else {
        this.organisaerService.organisaerlogin(admin.email, admin.password).subscribe(
          (result: { token: any; userId: any; }) => {
            this.organisaerService.storeToken(result.token);
            localStorage.setItem('organisaerId', result.userId); // Store the user ID in local storage

            this.router.navigate(['organisaerhome']);
          },
          (err: { error: { message: string | undefined; }; }) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      }
    }
  }
}
  