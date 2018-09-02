import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamSplitterPanelComponent } from './tam-splitter-panel.component';

describe('TamSplitterPanelComponent', () => {
  let component: TamSplitterPanelComponent;
  let fixture: ComponentFixture<TamSplitterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamSplitterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamSplitterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
