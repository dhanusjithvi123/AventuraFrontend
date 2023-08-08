import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/componets/users/emitter/emitter';
import { HttpHeaders } from '@angular/common/http';
import { UserServiceService}  from  'src/app/Services/user/user-service.service'

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  

  authenticated = false;

  message!: string; // Declare the 'message' property with type 'string'

  constructor(private http: HttpClient,private userService: UserServiceService) {}


  ngOnInit(): void {
    
    const token = this.userService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get('http://localhost:5000/user', { headers, withCredentials: true })
        .subscribe(
          (res: any) => {
            this.message = `Hi ${res.firstName}`;
            Emitters.authEmitter.emit(true);
          },
          (err) => {
            this.message = "You are not logged in";
            Emitters.authEmitter.emit(false);
          }
        );
    } else {
      this.message = "You are not logged in";
      Emitters.authEmitter.emit(false);
    }
  }
  
}
