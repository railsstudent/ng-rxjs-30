import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelData } from '../panel/interfaces';

@Component({
    selector: 'app-panels',
    template: `
    <div class="panels">
      <app-panel
        *ngFor="let panelData of data"
        [panelData]="panelData"
      ></app-panel>
    </div>
  `,
    styles: [
        `
      :host {
        display: block;
      }

      .panels {
        min-height: 100vh;
        overflow: hidden;
        display: flex;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PanelsComponent {
  data: PanelData[] = [
    {
      headline1: 'Hey',
      headline2: "Let's",
      headline3: 'Dance',
      backgroundImage: 'https://source.unsplash.com/gYl-UtwNg_I/1500x1500',
    },
    {
      headline1: 'Give',
      headline2: 'Take',
      headline3: 'Receive',
      backgroundImage: 'https://source.unsplash.com/rFKUFzjPYiQ/1500x1500',
    },
    {
      headline1: 'Experience',
      headline2: 'It',
      headline3: 'Today',
      backgroundImage:
        'https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d',
    },
    {
      headline1: 'Give',
      headline2: 'All',
      headline3: 'You can',
      backgroundImage: 'https://source.unsplash.com/ITjiVXcwVng/1500x1500',
    },
    {
      headline1: 'Life',
      headline2: 'In',
      headline3: 'Motion',
      backgroundImage: 'https://source.unsplash.com/3MNzGlQM7qs/1500x1500',
    },
  ];
}
