import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { InboxItemComponent } from './inbox-item/inbox-item.component';

@NgModule({
  declarations: [
    InboxComponent,
    InboxItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InboxComponent
  ]
})
export class InboxModule { }
