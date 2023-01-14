import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlighterContentComponent } from './highlighter-content.component';

describe('HighlighterContentComponent', () => {
  let component: HighlighterContentComponent;
  let fixture: ComponentFixture<HighlighterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlighterContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlighterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
