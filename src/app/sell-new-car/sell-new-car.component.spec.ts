import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellNewCarComponent } from './sell-new-car.component';

describe('SellNewCarComponent', () => {
  let component: SellNewCarComponent;
  let fixture: ComponentFixture<SellNewCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellNewCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellNewCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
