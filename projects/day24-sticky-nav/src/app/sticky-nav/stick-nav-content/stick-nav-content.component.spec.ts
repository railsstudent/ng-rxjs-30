import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickNavContentComponent } from './stick-nav-content.component';

describe('StickNavContentComponent', () => {
  let component: StickNavContentComponent;
  let fixture: ComponentFixture<StickNavContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickNavContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickNavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
