import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickNavHeaderComponent } from './stick-nav-header.component';

describe('StickNavHeaderComponent', () => {
  let component: StickNavHeaderComponent;
  let fixture: ComponentFixture<StickNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickNavHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
