import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { Message } from '../interfaces';
import { HttpClient } from '@angular/common/http';

const initialMessagesPromise = () => {
  const httpClient = inject(HttpClient);
  const url = 'https://gist.githubusercontent.com/railsstudent/ccda9a9d5c0761791d58c7edc3bce406/raw/7469e6c86372bd864a9995603663a719586c1701/messages.json';
  const messages$ = httpClient.get<{ messages: Message[] }>(url).pipe(
    map(({ messages }) => messages),
  );

  return firstValueFrom(messages$);
}

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
  private messagesSub$ = new BehaviorSubject<Message[]>([]);

  getMessages(defaultValue?: Message[]): Message[] {
    const values = this.messagesSub$.getValue();
    if (values && values.length >= 0) {
      return values;
    }
    
    this.messagesSub$.next(defaultValue || []);
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
