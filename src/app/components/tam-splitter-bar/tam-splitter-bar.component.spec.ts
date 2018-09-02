import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamSplitterBarComponent } from './tam-splitter-bar.component';

describe('TamSplitterBarComponent', () => {
  let component: TamSplitterBarComponent;
  let fixture: ComponentFixture<TamSplitterBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamSplitterBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamSplitterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
