import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamSplitterComponent } from './tam-splitter.component';

describe('TamSplitterComponent', () => {
  let component: TamSplitterComponent;
  let fixture: ComponentFixture<TamSplitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamSplitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
