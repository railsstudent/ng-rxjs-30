import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSub$ = new BehaviorSubject<Message[]>(
    [
      {
        id: 1,
        description: 'This is an inbox layout.',
        isChecked: false,
      },
      {
        id: 2,
        description: 'Check one item',
        isChecked: false,
      },
      { 
        id: 3,
        description: 'Hold down your Shift key',
        isChecked: false,
      },
      {
        id: 4,
        description: 'Check a lower item',
        isChecked: false,
      },
      {
        id: 5,
        description: 'Everything inbetween should also be set to checked',
        isChecked: false,
      },
      {
        id: 6,
        description: 'Try do it without any libraries',
        isChecked: false,
      },
      {
        id: 7,
        description: 'Just regular JavaScript',
        isChecked: false,
      },
      {
        id: 8,
        description: 'Good Luck!',
        isChecked: false,
      },
      {
        id: 9,
        description: 'Don\'t forget to tweet your result!',
        isChecked: false,
      }
    ]
  );

  getMessages(): Message[] {
    return this.messagesSub$.getValue();
  }

  updateMessageState(messageId: number, isChecked: boolean): void {
    const messages = this.messagesSub$.getValue();
    const mutatedMessages = messages.map(message => {
      if (message.id === messageId) {
        return {
          ...message,
          isChecked,
        }
      }
      return message;
    })

    this.messagesSub$.next(mutatedMessages);
  }
}
