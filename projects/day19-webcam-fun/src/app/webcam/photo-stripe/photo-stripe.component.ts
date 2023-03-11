import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from '../interfaces/webcam.interface';

@Component({
  selector: 'app-photo-stripe',
  template: `<div class="strip">
    <a *ngFor="let photo of photoStripe; index as i" [href]="photo.data" download="{{ photo.download }}{{ i + 1 }}">
      <img [src]="photo.data" [alt]="photo.description" />
    </a>
  </div>`,
  styles: [
    `
      :host {
        display: block;
      }

      .strip {
        padding: 2rem;
      }

      .strip img {
        width: 100px;
        overflow-x: scroll;
        padding: 0.8rem 0.8rem 2.5rem 0.8rem;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        background: white;
      }

      .strip a:nth-child(5n + 1) img {
        transform: rotate(10deg);
      }
      .strip a:nth-child(5n + 2) img {
        transform: rotate(-2deg);
      }
      .strip a:nth-child(5n + 3) img {
        transform: rotate(8deg);
      }
      .strip a:nth-child(5n + 4) img {
        transform: rotate(-11deg);
      }
      .strip a:nth-child(5n + 5) img {
        transform: rotate(12deg);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoStripeComponent {
  @Input()
  photoStripe!: Photo[];
}
