import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservedCarsComponent } from './observed-cars.component';

describe('ObservedCarsComponent', () => {
  let component: ObservedCarsComponent;
  let fixture: ComponentFixture<ObservedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
