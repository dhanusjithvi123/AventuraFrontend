import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/Services/chat/chat.service';

@Component({
  selector: 'app-organizerchat',
  templateUrl: './organizerchat.component.html',
  styleUrls: ['./organizerchat.component.css']
})
export class OrganizerchatComponent implements OnInit {
  messages: { text: string; isUser: boolean; timestamp: Date }[] = [];
  newMessage: string = '';
  loadingMessages: boolean = true;
  sender_id!: string;
  receiver_id!: string;

  constructor(
    private router: Router,
    private chatService: ChatService
  ) { chatService.newMessageReceived().subscribe((nooo)=>{
    console.log(nooo);
    
  })}

  ngOnInit(): void {

    console.log("chat works");
    
    this.receiver_id = localStorage.getItem('adminId')!;
    this.sender_id = localStorage.getItem('organisaerId')!;

    
    

    this.chatService.activateUser( this.sender_id );

    if (this.sender_id && this.receiver_id) {
      // Join the chat room

      console.log("idd"+this.sender_id);
      this.chatService.joinChat({ sender_id: this.sender_id, receiver_id: this.receiver_id });

      // Listen for new messages
      this.chatService.newMessageReceived().subscribe((message) => {
        this.addReceivedMessage(message.message);
      });

      
 
      // Fetch previous chat messages when the component is initialized
      this.fetchPreviousChatMessages(this.sender_id, this.receiver_id);
    } else {
      console.error('Sender ID or Receiver ID is not available.');
    }
  }

  addUserMessage(text: string): void {
    this.messages.push({ text, isUser: true, timestamp: new Date() });
  }

  addReceivedMessage(text: string): void {
    this.messages.push({ text, isUser: false, timestamp: new Date() });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      if (this.sender_id && this.receiver_id) {
        const messageData = {
          sender_id: this.sender_id,
          receiver_id: this.receiver_id,
          message: this.newMessage
        };

        // Send the message using the ChatService
        this.chatService.sendMessage(messageData);

        // Store the sent message locally for immediate display
        this.addUserMessage(this.newMessage);

        // Call the function to store the message on the backend
        this.storeSendMessage(messageData);
        
        // Clear the input field
        this.newMessage = '';
      } else {
        console.error('Sender ID or Receiver ID is not available.');
      }
    }
  }

  // Add this function to store the message on the backend
  private storeSendMessage(messageData: any): void {
    this.chatService.storeSendMessages(messageData).subscribe(
      (response: any) => {
        // Handle the response from the backend if needed
        console.log('Message stored on the backend:', response);
      },
      (error) => {
        console.error('Error storing message on the backend:', error);
      }
    );
  }

  fetchPreviousChatMessages(sender_id: string, receiver_id: string): void {
    console.log(sender_id,receiver_id);
    
    this.loadingMessages = true;

    // Make an HTTP GET request to your backend endpoint to fetch chat messages
    this.chatService.getAllMessages({ sender_id, receiver_id }).subscribe(
      (response: any) => {
        this.loadingMessages = false;

        if (response && response.messages) {
          this.messages = response.messages.map((message: any) => {
            return {
              text: message.message,
              isUser: message.user === 'sender',
              timestamp: new Date(message.time),
            };
          });
        } else {
          console.error('No messages found in the response.');
        }
      },
      (error) => {
        console.error(error);
        this.loadingMessages = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['chatlist']);
  }
}
