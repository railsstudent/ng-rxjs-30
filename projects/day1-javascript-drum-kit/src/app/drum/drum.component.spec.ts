import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumComponent } from './drum.component';

describe('DrumComponent', () => {
  let component: DrumComponent;
  let fixture: ComponentFixture<DrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
