import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';  

interface category {
  _id: string; // Add the _id property
  name: string;
  email: string;
  phoneNumber: string;
  status: boolean;
}

@Component({
  selector: 'app-admin-category-addand-edit',
  templateUrl: './admin-category-addand-edit.component.html',
  styleUrls: ['./admin-category-addand-edit.component.css']
})
export class AdminCategoryAddandEditComponent   implements OnInit  {
  categoryForm!: FormGroup;

  displayedColumns: string[] = ['Category'];
  category:category[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.initializeForm();

    this.http.get<category[]>('http://localhost:5000/admin/categorylist').subscribe(
      (response) => {
        this.category = response;
        console.log();
        
      },
      (error) => {
        console.error(error);
      }
    );
  }



  initializeForm(): void {
    this.categoryForm = this.fb.group({
      Category: ['', Validators.required],
    });
  }

  CategoryaddingSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      console.log(formData);
  
      this.http.post('http://localhost:5000/admin/Categoryadding', formData)
        .subscribe(
          (response) => {
            console.log(response); // Add this line to see the response from the server
            Swal.fire('Success', 'Event Added successful!', 'success').then(
              () => {
                this.router.navigate(['/categorylist']);
              }
            );
          },
          (error) => {
            console.log(error); // Add this line to see the error response from the server
            if (error?.error?.message === 'Category already exists') {
              Swal.fire('Error', 'Category already exists.', 'error');
            } else {
              Swal.fire('Error', 'Event Adding failed!', 'error');
            }
          }
        );
    } else {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      this.categoryForm.markAllAsTouched();
    }
  }

}
