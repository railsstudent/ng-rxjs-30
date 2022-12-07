import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-web-camera',
  templateUrl: './web-camera.component.html',
  styleUrls: ['./web-camera.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebCameraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
