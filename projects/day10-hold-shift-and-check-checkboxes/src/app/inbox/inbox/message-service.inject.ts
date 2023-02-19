import { inject } from '@angular/core';
import { Subject, map, scan, startWith } from 'rxjs';
import { CheckboxClickState, InBetweenCheckboxClicked } from '../interfaces';
import { MessageService } from '../services';

const checkBetweenBoxesFn = () => {
    const messageService = inject(MessageService);
  
    return (inBetweenClicked: InBetweenCheckboxClicked) => {
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
  
export const createMessagesFn = () => {
    const messageService = inject(MessageService);
    const initState: InBetweenCheckboxClicked = {
      isShiftKeyPressed: false,
      isChecked: false,
      prevCheck: -1,
      lastCheck: -1,
    };
    const checkBetweenBoxes = checkBetweenBoxesFn();
  
    return (checkboxClickedSub$: Subject<CheckboxClickState>) => 
      checkboxClickedSub$
        .pipe(
          scan((acc, item) =>  ({ ...item, prevCheck: acc.lastCheck }), initState),
          map((inBetweenClicked) => {
            messageService.updateMessageState(inBetweenClicked.lastCheck, inBetweenClicked.isChecked);
            checkBetweenBoxes(inBetweenClicked);
            return messageService.getMessages();
          }),
          startWith(messageService.getMessages())
        );
}