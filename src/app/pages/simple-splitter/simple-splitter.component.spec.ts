import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSplitterComponent } from './simple-splitter.component';

describe('SimpleSplitterComponent', () => {
  let component: SimpleSplitterComponent;
  let fixture: ComponentFixture<SimpleSplitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSplitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
