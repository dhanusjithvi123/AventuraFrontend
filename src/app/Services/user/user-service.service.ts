import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'http://localhost:5000';

  constructor(  private http: HttpClient,) { }

  userlogin(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, user, {
      withCredentials: true,
    });
  }

  newpassword(userId: string, password: string): Observable<any> {
    // Include the user ID in the URL as a parameter
    const url = `${this.baseUrl}/newpassword/${userId}`;
    const user = { password }; // Include the user password in the request body
    return this.http.put<any>(url, user, {
      withCredentials: true,
    });
  }
  


  userpasswordchanging(email: string): Observable<any> {
    const user = { email };
    return this.http.post<any>(`${this.baseUrl}/emailentering`, user, {
      withCredentials: true,
    });
  }


  userotp(otp: number, ): Observable<any> {
    const user = {otp};
    return this.http.post<any>(`${this.baseUrl}/otpverify`,user, {
      withCredentials: true,
    });
  }
  
  storeToken(tokenValue: string) {
    localStorage.setItem('usertoken', tokenValue);
  }

  getToken() {
    console.log(localStorage.getItem('usertoken'));

    return localStorage.getItem('usertoken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usertoken');
  }

  updateUser (id: any, data: any): Observable<any> {
    return this.http.put<any>(`/updateprofile/${id}`, data);
  }

}


