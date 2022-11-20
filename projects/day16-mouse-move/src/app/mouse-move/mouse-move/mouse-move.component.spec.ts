import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseMoveComponent } from './mouse-move.component';

describe('MouseMoveComponent', () => {
  let component: MouseMoveComponent;
  let fixture: ComponentFixture<MouseMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouseMoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
