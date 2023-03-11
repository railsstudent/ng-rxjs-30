import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebCameraComponent } from './web-camera/web-camera.component';
import { PhotoStripeComponent } from './photo-stripe/photo-stripe.component';

@NgModule({
  declarations: [WebCameraComponent, PhotoStripeComponent],
  imports: [CommonModule],
  exports: [WebCameraComponent],
})
export class WebCamModule {}
