import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/componets/users/emitter/emitter';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent  implements OnInit {
  authenticated = false;

  constructor(private http:HttpClient){}
  ngOnInit():void{
   Emitters.authEmitter.subscribe((auth:boolean) => {
    this.authenticated = auth
   })
  }

  logout(): void{
    this.http.post('http://www.backend.aventuraevents.site/logout',{},{withCredentials:true})
    .subscribe(() => this.authenticated = false)
  }
}
