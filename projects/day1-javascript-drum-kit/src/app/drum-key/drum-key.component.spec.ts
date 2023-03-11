import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumKeyComponent } from './drum-key.component';

describe('DrumkeyComponent', () => {
  let component: DrumKeyComponent;
  let fixture: ComponentFixture<DrumKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrumKeyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
