import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class OrganisaersService {
  private baseUrl = 'https://backend.aventuraevents.site';

  constructor(
    private http: HttpClient,

    private cookieService: CookieService
  ) {}

  organisaerlogin(email: string, password: string): Observable<any> {
    const organisaer = { email, password };
    return this.http.post<any>(`${this.baseUrl}/organisaer/organisaerlogin`, organisaer, {
      withCredentials: true,
    });
  }

  updateUser (id: any, data: any): Observable<any> {
    return this.http.put<any>(`/organisaer/eventadding/${id}`, data);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('orgaisertoken', tokenValue);
  }

  getToken() {
    console.log(localStorage.getItem('orgaisertoken'));
    
    return localStorage.getItem('orgaisertoken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('orgaisertoken');
  }

  editEventById(id: any) {
    return this.http.get<any>(`/organisaer/editevent/${id}`);
  }  

  updateEvent (id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/organisaer/updateEvent/${id}`, data);
  }

}
