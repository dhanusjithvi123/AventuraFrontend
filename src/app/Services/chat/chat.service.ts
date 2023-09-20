import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
const url = 'https://backend.aventuraevents.site';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _socket: any;
  messages: { user: string; message: string; time?: Date | number }[] = [];

  constructor(private _http: HttpClient) {
    this._socket = io(`${url}`); // Replace with your Socket.IO server URL
  }

  // To socket.io

  // Join a chat room
  joinChat(userIds: any) {
    if (userIds) {
      this._socket.emit('join', userIds);
    }
  }

  // Activate a user
  activateUser(userId?: string) {
    if (userId) {
      console.log(userId);
      
      this._socket.emit('activate', userId);
    }
  }

  // Get a list of activated users
  activatedUsers(): Observable<{ [key: string]: { user_id: string; socketId: string } }> {
    return new Observable<{ [key: string]: { user_id: string; socketId: string } }>((observer) => {
      this._socket.on('active-users', (data: { [key: string]: { user_id: string; socketId: string; }; } | undefined) => {
        observer.next(data);
      });
      return () => {
        this._socket.disconnect();
      };
    });
  }

  // Send a message
  sendMessage(data: { sender_id: string; receiver_id: string; message: string }) {
    this._socket.emit('send-message', data);
  }

  // Receive a new message
  
  newMessageReceived(){
    let resiver = new Observable<{ user: string; message: string; time?: Date | number }>((observer) => {
      this._socket.on('receive-message', (data: { user: string; message: string; time?: number | Date | undefined; } | undefined) => {
       console.log(data);
       
        observer.next(data);

      });
      return () => {
        this._socket.disconnect();
      };
    });

    return resiver
  }

  // Disconnect a user
  disconnect(user_id: string) {
    this._socket.emit('disconnectUser', user_id);
  }

  // To database

  // Create a new chat room
  createNewChatRoom(data: any) {
    return this._http.post(`${url}/admin/createNewChatRoom`, data); // Replace with your backend URL
  }

  // Store sent messages in the database
  storeSendMessages(data: any) {
    console.log('storeSendMessages called');
    return this._http.post(`${url}/admin/storeMessages`, data); // Replace with your backend URL
  }
  

  // Get all message receivers
  getAllMessageReceivers(user_id: string) {
    return this._http.get(`${url}/admin/getAllReceivers/${user_id}`); // Replace with your backend URL
  }

  // Get all messages between sender_id and receiver_id
  getAllMessages(details: any) {
    console.log(details);
    
    return this._http.get(`${url}/admin/getAllMessages/${details.sender_id}/${details.receiver_id}`); // Replace with your backend URL
  }
}
