import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisaersService } from 'src/app/Services/organisaer/organisaers.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organisaer-eventediting',
  templateUrl: './organisaer-eventediting.component.html',
  styleUrls: ['./organisaer-eventediting.component.css'],
})
export class OrganisaerEventeditingComponent implements OnInit {
  eventEditingForm!: FormGroup; // Declare the form group

  data = {
    eventName: "",
    eventRate: "",
    features: "",
    phone: "",
  };
  id: any;

  constructor(
    private apiService: OrganisaersService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, // Inject FormBuilder
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    // Initialize the form group and form controls
    this.eventEditingForm = this.fb.group({
      eventName: ['', Validators.required],
      eventRate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      features: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
    });

    this.http.get<any>(`http://localhost:5000/organisaer/editevent/${this.id}`).subscribe(
      (res: any) => {
        
        this.data.eventName = res.eventName;
        this.data.eventRate = res.eventRate;
        this.data.features = res.features;
        this.data.phone = res.phone;

        // Set the form values
        this.eventEditingForm.patchValue({
          eventName: this.data.eventName,
          eventRate: this.data.eventRate,
          features: this.data.features,
          phone: this.data.phone, // Update 'number' to 'phone'
        });
      },
      (error: any) => {
        console.error(error);
        // Handle the error here
      }
    );
  }

  onSubmit(): void {
    if (this.eventEditingForm.valid) {
      const formData = this.eventEditingForm.value;

      // Perform the update using formData and this.id
      this.apiService.updateEvent(this.id, formData).subscribe(
        (res: any) => {
          if (res.success === 1) {
            this.router.navigate(['/eventlist']);
          }
        },
        (error: any) => {
          console.error(error);
          // Handle the error here
        }
      );
    }
  }
}
