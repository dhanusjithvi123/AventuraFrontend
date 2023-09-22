import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Category {
  _id: string;
  Category: string; // Change 'name' to 'Category' to match the API response
  __v: number;
}

@Component({
  selector: 'app-admin-categorylist',
  templateUrl: './admin-categorylist.component.html',
  styleUrls: ['./admin-categorylist.component.css']
})
export class AdminCategorylistComponent implements OnInit {
  categoryForm!: FormGroup;
  displayedColumns: string[] = ['Category', 'Count']; // Updated columns
  categories: Category[] = [];
  dataCount: number = 0; // Property to store the count

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.http.get<{ category: Category[] }>('http://localhost:5000admin/categorylist').subscribe(
      (response) => {
        this.categories = response.category;
        this.dataCount = this.categories.length; // Set the data count
        console.log(this.categories);
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
  
      this.http.post('http://localhost:5000admin/Categoryadding', formData)
        .subscribe(
          (response) => {
            console.log(response); // Add this line to see the response from the server
            Swal.fire('Success', 'Event Added successfully!', 'success').then(
              () => {
                this.router.navigate(['/eventadding']);
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
