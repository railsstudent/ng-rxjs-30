import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  getMessages(): Observable<Message[]> {
    const items: Message[] = [
      {
        description: 'This is an inbox layout.',
        isChecked: false,
      },
      {
        description: 'Check one item',
        isChecked: false,
      },
      { 
        description: 'Hold down your Shift key',
        isChecked: false,
      },
      {
        description: 'Check a lower item',
        isChecked: false,
      },
      {
        description: 'Everything inbetween should also be set to checked',
        isChecked: false,
      },
      {
        description: 'Try do it without any libraries',
        isChecked: false,
      },
      {
        description: 'Just regular JavaScript',
        isChecked: false,
      },
      {
        description: 'Good Luck!',
        isChecked: false,
      },
      {
        description: 'Don\'t forget to tweet your result!',
        isChecked: false,
      }
    ];    
    return of<Message[]>(items);
  }
}
