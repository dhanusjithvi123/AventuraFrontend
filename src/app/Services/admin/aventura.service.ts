import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AventuraService {
  private baseUrl = 'http://www.backend.aventuraevents.site';

  constructor(
    private http: HttpClient,

    private cookieService: CookieService
  ) {}

  adminlogin(email: string, password: string): Observable<any> {
    const admin = { email, password };
    return this.http.post<any>(`${this.baseUrl}/admin/adminlogin`, admin, {
      withCredentials: true,
    });
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
