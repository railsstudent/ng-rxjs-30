import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContainerComponent } from './list-container/list-container.component';
import { DataListComponent } from './data-list/data-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListContainerComponent, DataListComponent],
  imports: [CommonModule, FormsModule],
  exports: [ListContainerComponent],
})
export class ListModule {}
