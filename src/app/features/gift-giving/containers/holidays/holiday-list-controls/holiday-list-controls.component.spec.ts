import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayListControlsComponent } from './holiday-list-controls.component';

describe('HolidayListControlsComponent', () => {
  let component: HolidayListControlsComponent;
  let fixture: ComponentFixture<HolidayListControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayListControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayListControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
