import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlighterPageComponent } from './highlighter-page.component';

describe('HighlighterPageComponent', () => {
  let component: HighlighterPageComponent;
  let fixture: ComponentFixture<HighlighterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlighterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlighterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
