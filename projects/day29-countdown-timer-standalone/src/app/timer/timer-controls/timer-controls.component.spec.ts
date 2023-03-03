import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerControlsComponent } from './timer-controls.component';

describe('TimerControlsComponent', () => {
  let component: TimerControlsComponent;
  let fixture: ComponentFixture<TimerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TimerControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
