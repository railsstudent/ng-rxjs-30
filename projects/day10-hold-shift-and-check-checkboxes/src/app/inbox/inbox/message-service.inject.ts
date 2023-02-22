import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Subject, firstValueFrom, map, scan } from 'rxjs';
import { CheckboxClickState, InBetweenCheckboxClicked, Message } from '../interfaces';

const updateMessageState = (id: number, isChecked: boolean, messages: Message[]) => {
  return messages.map(message => {
      if (message.id === id) {
        return {
          ...message,
          isChecked,
        }
      }
      return message;
    });
}
  
const checkBetweenBoxesFn = () => (inBetweenClicked: InBetweenCheckboxClicked) => {
  const { isShiftKeyPressed, isChecked, lastCheck, prevCheck, messages } = inBetweenClicked;
  let checkedMessages = [...messages];

  if (isShiftKeyPressed && isChecked) {
    let inBetween = false;
    messages.forEach(({ id }) => {
      if (id === lastCheck || id === prevCheck) {
        inBetween = !inBetween;
      }
      
      if (inBetween) {
        checkedMessages = updateMessageState(id, inBetween, messages);
      }    
    });  
  }

  return checkedMessages;
}

export const createCheckedMessagesFn = () => {
  const initState: InBetweenCheckboxClicked = {
    isShiftKeyPressed: false,
    isChecked: false,
    prevCheck: -1,
    lastCheck: -1,
    messages: [],
  };
  const checkBetweenBoxes = checkBetweenBoxesFn();
        
  return (checkboxClickedSub$: Subject<CheckboxClickState>) => 
    checkboxClickedSub$
      .pipe(
        scan((acc, item) =>  { 
          const mutatedMessages = updateMessageState(item.lastCheck, item.isChecked, acc.messages);
          const inBetweenClicked = { ...item, prevCheck: acc.lastCheck, messages: mutatedMessages };
          const checkedMessages = checkBetweenBoxes(inBetweenClicked);

          return ({ ...item, prevCheck: acc.lastCheck, messages: checkedMessages })
        }, initState),
        map(({ messages }) => messages),
      );
}

export const initialMessage = () => {
  const httpClient = inject(HttpClient);
  const url = 'https://gist.githubusercontent.com/railsstudent/ccda9a9d5c0761791d58c7edc3bce406/raw/7469e6c86372bd864a9995603663a719586c1701/messages.json';
  const messages$ = httpClient.get<{ messages: Message[] }>(url).pipe(
    map(({ messages }) => messages),
  );

  return firstValueFrom(messages$);
}
