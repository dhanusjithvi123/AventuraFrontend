import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-organiserbookinglist',
  templateUrl: './organiserbookinglist.component.html',
  styleUrls: ['./organiserbookinglist.component.css']
})
export class OrganiserbookinglistComponent implements OnInit {

  dataSource: MatTableDataSource<Event>;
  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Event>([]);
  }

  ngOnInit(): void {
    const organisaerId = localStorage.getItem('organisaerId');

    this.http
      .get<any>(`http://localhost:5000/organisaer/bookedlist/${organisaerId}`)
      .subscribe(
        (response) => {
          console.log(response.events);
          this.dataSource.data = response.events;
        },
        (error) => {
          console.error(error);
        }
      );
  }

}
