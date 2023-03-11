import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelsComponent } from './panels/panels.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  declarations: [PanelsComponent, PanelComponent],
  imports: [CommonModule],
  exports: [PanelsComponent],
})
export class PanelsModule {}
