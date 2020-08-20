import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHendlerComponent } from './car-hendler.component';

describe('CarHendlerComponent', () => {
  let component: CarHendlerComponent;
  let fixture: ComponentFixture<CarHendlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarHendlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHendlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
