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
import { OrganisaersService } from 'src/app/Services/organisaer/organisaers.service';

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
  selector: 'app-organisaer-eventadding',
  templateUrl: './organisaer-eventadding.component.html',
  styleUrls: ['./organisaer-eventadding.component.css'],
})
export class OrganisaerEventaddingComponent implements OnInit {
  @ViewChild('eventaddingFormElement') eventaddingFormElement!: ElementRef<HTMLFormElement>;
  eventaddingForm!: FormGroup;
  organisaerId: any; // User ID variable
  selectedFileName: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: OrganisaersService
  ) {}

  ngOnInit(): void {
    // Retrieve the user ID from local storage
    this.organisaerId = localStorage.getItem('organisaerId');
    this.initializeForm();
  }

  initializeForm(): void {
    this.eventaddingForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventRate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{5}$/),
          positiveNumberValidator(),
        ],
      ],
      number: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
          positiveNumberValidator(),
        ],
      ],
      features: ['', Validators.required],
      image: [null, Validators.required] 
    });
  }
  ngAfterViewInit() {
    // Set the enctype attribute on the form after it's rendered
    this.eventaddingFormElement.nativeElement.enctype = 'multipart/form-data';
  }

  handleImageInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.eventaddingForm.patchValue({ image: file });
    } else {
      this.selectedFileName = '';
      this.eventaddingForm.patchValue({ image: null });
    }
  }

  eventaddingSubmit(): void {
    if (this.eventaddingForm.valid) {
      const formData = this.eventaddingForm.value;

      const requestBody = new FormData();
      requestBody.append('eventName', formData.eventName);
      requestBody.append('eventRate', formData.eventRate);
      requestBody.append('phone', formData.number);
      requestBody.append('features', formData.features);
      requestBody.append('image', formData.image);

      this.http
        .post(
          `http://localhost:5000/organisaer/eventadding/${this.organisaerId}`,
          requestBody
        )
        .subscribe(
          (response) => {
            Swal.fire('Success', 'Event Added successful!', 'success').then(
              () => {
                this.router.navigate(['/eventlist']);
              }
            );
          },
          (error) => {
            if (error?.error?.message === 'Email is already taken') {
              Swal.fire('Error', 'Email is already taken', 'error');
            } else {
              Swal.fire('Error', 'Event Adding failed!', 'error');
            }
          }
        );
    } else {
      Swal.fire('Error', 'Please enter all the fields', 'error');
      this.eventaddingForm.markAllAsTouched();
      this.selectedFileName = ''
    }
  }
}

