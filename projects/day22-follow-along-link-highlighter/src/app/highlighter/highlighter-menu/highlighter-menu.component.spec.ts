import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlighterMenuComponent } from './highlighter-menu.component';

describe('HighlighterMenuComponent', () => {
  let component: HighlighterMenuComponent;
  let fixture: ComponentFixture<HighlighterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlighterMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HighlighterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
