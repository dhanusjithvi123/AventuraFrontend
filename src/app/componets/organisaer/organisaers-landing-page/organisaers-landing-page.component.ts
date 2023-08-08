import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-organisaers-landing-page',
  templateUrl: './organisaers-landing-page.component.html',
  styleUrls: ['./organisaers-landing-page.component.css']
})
export class OrganisaersLandingPageComponent {

  constructor(private router:Router){}

  myFunction() {
    this.router.navigate(['/organisaerregister']);
  }
  
  
}
