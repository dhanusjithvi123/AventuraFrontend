import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'https://backend.aventuraevents.site';

  constructor(  private http: HttpClient,) { }

  userlogin(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, user, {
      withCredentials: true,
    });
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }


  userotp(otp: number, ): Observable<any> {
    const user = { otp};
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
