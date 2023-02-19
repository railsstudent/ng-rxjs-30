import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../interfaces';

const createMessages = () => {
  const descriptions  = [
    'This is an inbox layout.',
    'Check one item',
    'Hold down your Shift key',
    'Check a lower item',
    'Everything inbetween should also be set to checked',
    'Try do it without any libraries',
    'Just regular JavaScript',
    'Good Luck!',
    'Don\'t forget to tweet your result!',
  ]

  return descriptions.map((description, index) => ({
    id: index + 1,
    description,
    isChecked: false
  }));
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSub$ = new BehaviorSubject<Message[]>(createMessages());

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
