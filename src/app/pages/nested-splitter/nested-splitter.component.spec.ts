import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedSplitterComponent } from './nested-splitter.component';

describe('NestedSplitterComponent', () => {
  let component: NestedSplitterComponent;
  let fixture: ComponentFixture<NestedSplitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedSplitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
