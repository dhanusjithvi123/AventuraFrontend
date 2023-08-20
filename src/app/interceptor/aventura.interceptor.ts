import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://backend.aventuraevents.site/admin';

  constructor(private http: HttpClient) {}

  adminlogin(admin: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/adminlogin`, admin, { withCredentials: true });
  }
}
