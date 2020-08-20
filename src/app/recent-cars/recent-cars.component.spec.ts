import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCarsComponent } from './recent-cars.component';

describe('RecentCarsComponent', () => {
  let component: RecentCarsComponent;
  let fixture: ComponentFixture<RecentCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
