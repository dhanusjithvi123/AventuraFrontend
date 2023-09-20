import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChatService } from 'src/app/Services/chat/chat.service';

@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.component.html',
  styleUrls: ['./adminchat.component.css']
})
export class AdminchatComponent implements OnInit {
  messages: { text: string; isUser: boolean; timestamp: Date }[] = [];
  newMessage: string = '';
  sender_id: string = '';
  receiver_id: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {{ chatService.newMessageReceived().subscribe((nooo)=>{
    console.log(nooo);
    
  })}}

  ngOnInit(): void {
    // Retrieve sender_id from local storage
    this.sender_id = localStorage.getItem('adminId') ?? '';

    this.chatService.activateUser( this.sender_id );

    if (!this.sender_id) {
      console.error('Sender ID is not available in local storage.');
    } else {
      this.receiver_id = this.route.snapshot.params['receiver_id'] ?? '';
      this.fetchPreviousChatMessages(this.sender_id, this.receiver_id);
      this.initializeSocket(); // Initialize Socket.IO
    }
  }

  addUserMessage(text: string): void {
    const timestamp = new Date();
    const newUserMessage = { text, isUser: true, timestamp };
    this.messages = [...this.messages, newUserMessage];
  }

  addReceivedMessage(text: string): void {
    const timestamp = new Date();
    const newReceivedMessage = { text, isUser: false, timestamp };
    this.messages = [...this.messages, newReceivedMessage];
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const sender_id = localStorage.getItem('adminId');
      const receiver_id = this.route.snapshot.params['receiver_id'];

      if (sender_id) {
        const messageData = {
          sender_id,
          receiver_id,
          message: this.newMessage
        };

        // Use the ChatService to send the message
        this.chatService.sendMessage(messageData);

        // Store the sent message locally for immediate display
        this.addUserMessage(this.newMessage);

        // Call the function to store the message on the backend
        this.storeSendMessage(messageData);

        this.newMessage = '';
      } else {
        console.error('Sender ID is not available.');
      }
    }
  }

  private storeSendMessage(messageData: any): void {
    // Implement storing the message on the backend using the HttpClient here
    // This code will depend on your backend API
  }

  // Fetch previous chat messages from the backend
  fetchPreviousChatMessages(sender_id: string, receiver_id: string): void {
    // Make an HTTP GET request to your backend endpoint to fetch chat messages
    this.http.get(`https://backend.aventuraevents.site/admin/getAllMessages/${sender_id}/${receiver_id}`).subscribe(
      (response: any) => {
        // Handle the retrieved messages here
        this.messages = response.messages.map((message: any) => {
          return {
            text: message.message,
            isUser: message.user === 'sender',
            timestamp: new Date(message.time),
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Initialize Socket.IO connection
  initializeSocket(): void {
    // Get the receiver_id from the route parameters
    const receiver_id = this.route.snapshot.params['receiver_id'];

    // Join the chat room
    this.chatService.joinChat({ sender_id: this.sender_id, receiver_id });
 

    // Listen for new messages
    this.chatService.newMessageReceived().subscribe((message) => {
      this.addReceivedMessage(message.message);
    });
  }

  goBack(): void {
    this.router.navigate(['chatlist']);
  }
}
