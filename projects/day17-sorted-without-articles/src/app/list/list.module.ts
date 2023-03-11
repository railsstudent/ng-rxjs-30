import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortedListComponent } from './sorted-list/sorted-list.component';

@NgModule({
  declarations: [SortedListComponent],
  imports: [CommonModule],
  exports: [SortedListComponent],
})
export class ListModule {}
