import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Filter.PipeComponent } from './filter.pipe.component';

describe('Filter.PipeComponent', () => {
  let component: Filter.PipeComponent;
  let fixture: ComponentFixture<Filter.PipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Filter.PipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Filter.PipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
