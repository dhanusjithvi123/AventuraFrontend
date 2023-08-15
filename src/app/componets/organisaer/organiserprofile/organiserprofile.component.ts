import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organiserprofile',
  templateUrl: './organiserprofile.component.html',
  styleUrls: ['./organiserprofile.component.css']
})
export class OrganiserprofileComponent {

  profileEditingForm!: FormGroup;
  data = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    companyName: '',
  };
  _id: string | null | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Initialize the form group and form controls
    this.profileEditingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
     companyName: ['', Validators.required],
    });

    this._id = localStorage.getItem('organisaerId');

    this.http
      .get<any>(`http://www.backend.aventuraevents.site/organisaer/editprofile/${this._id}`)
      .subscribe(
        (res: any) => {
          this.data.firstName = res.firstName;
          this.data.lastName = res.lastName;
          this.data.phone = res.phone;
          this.data.email = res.email;
          this.data.address = res.address;
          this.data.companyName = res.companyName;

          this.profileEditingForm.patchValue({
            firstName: this.data.firstName,
            lastName: this.data.lastName,
            email: this.data.email,
            phone: this.data.phone,
            address: this.data.address,
            companyName:this.data.companyName,
          });
        },
        (error: any) => {
          console.error(error);
        }
      );
  }


  onSubmit(): void {
    if (this.profileEditingForm.valid) {
      const formData = this.profileEditingForm.value;

      this.http.put<any>(`http://www.backend.aventuraevents.site/organisaer/updateprofile/${this._id}`, formData).subscribe(
        (res: any) => {
          console.log(res);
          // Handle the response from the backend as needed
          this.router.navigate(['../organisaerhome']); // Optionally, navigate to another page after successful update
        },
        (error: any) => {
          console.error(error);
          // Handle the error here (e.g., display an error message)
        }
      );
    }
  }
}
