import { inject } from '@angular/core';
import { Subject, map, scan } from 'rxjs';
import { CheckboxClickState, InBetweenCheckboxClicked, Message } from '../interfaces';
import { MessageService } from '../services';
  
const messageStore = () => {
  const messageService = inject(MessageService);

  return {
    getMessages: (defaultValue?: Message[]) => messageService.getMessages(defaultValue),
    updateMessageState: (id: number, isChecked: boolean) => messageService.updateMessageState(id, isChecked),
    checkBetweenBoxesFn: () => (inBetweenClicked: InBetweenCheckboxClicked) => {
      const { isShiftKeyPressed, isChecked, lastCheck, prevCheck } = inBetweenClicked;
      
      if (isShiftKeyPressed && isChecked) {
        let inBetween = false;
        const messages = messageService.getMessages();
        messages.forEach(({ id }) => {
          if (id === lastCheck || id === prevCheck) {
            inBetween = !inBetween;
          }
          
          if (inBetween) {
            messageService.updateMessageState(id, inBetween);
          }    
        });  
      }
    }
  }
}

export const createMessagesFn = () => {
  const initState: InBetweenCheckboxClicked = {
    isShiftKeyPressed: false,
    isChecked: false,
    prevCheck: -1,
    lastCheck: -1,
  };
  const { getMessages, updateMessageState, checkBetweenBoxesFn } = messageStore();
  const checkBetweenBoxes = checkBetweenBoxesFn();
        
  return (checkboxClickedSub$: Subject<CheckboxClickState>) => 
    checkboxClickedSub$
      .pipe(
        scan((acc, item) =>  ({ ...item, prevCheck: acc.lastCheck }), initState),
        map((inBetweenClicked) => {
          updateMessageState(inBetweenClicked.lastCheck, inBetweenClicked.isChecked);
          checkBetweenBoxes(inBetweenClicked);
          return getMessages();
        }),
        // startWith(store.getMessages(initialMessages))
      );
}