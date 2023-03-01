import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerPaneComponent } from './timer-pane.component';

describe('TimerPaneComponent', () => {
  let component: TimerPaneComponent;
  let fixture: ComponentFixture<TimerPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TimerPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
