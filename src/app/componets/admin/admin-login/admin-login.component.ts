import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AventuraService } from 'src/app/Services/admin/aventura.service';
import { Router } from '@angular/router'; // Import Router module
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private adminService: AventuraService, // Inject AdminService
    
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
        this.adminService.adminlogin(admin.email, admin.password).subscribe(
          (result) => {
            this.adminService.storeToken(result.token);
            // Store the user ID in local storage
            localStorage.setItem('adminId', result.adminId);
  
            this.router.navigate(['/adminhome']);
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      }
    }
  }
  
  
}
