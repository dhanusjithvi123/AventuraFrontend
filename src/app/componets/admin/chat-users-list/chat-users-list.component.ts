import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Organisaer {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: boolean;
}

@Component({
  selector: 'app-chat-users-list',
  templateUrl: './chat-users-list.component.html',
  styleUrls: ['./chat-users-list.component.css']
})
export class ChatUsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'status'];
  organisaers: Organisaer[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Organisaer[]>('https://backend.aventuraevents.site/organisaer/organisaerList').subscribe(
      (response) => {
        this.organisaers = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToChat(receiver_id : string): void {
    // Retrieve the userId from local storage
    const sender_id= localStorage.getItem('adminId');

    // Check if userId is available
    if (sender_id) {
      // Create an object to send both organisaerId and userId to the backend
      const data = {
        sender_id,
        receiver_id 
      };

      console.log(data);
      

      // Make an HTTP request to the backend and send the data
      this.http.post('https://backend.aventuraevents.site/admin/createNewChatRoom', data).subscribe(
        (response) => {
          // Handle the response from the backend if needed
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
      console.log(receiver_id);
      

      // Navigate to the chat component
      this.router.navigate(['adminchat',receiver_id]);
    } else {
      console.error('userId is not available in local storage.');
    }
  }}
