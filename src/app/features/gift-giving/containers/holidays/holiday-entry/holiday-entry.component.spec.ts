import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayEntryComponent } from './holiday-entry.component';

describe('HolidayEntryComponent', () => {
  let component: HolidayEntryComponent;
  let fixture: ComponentFixture<HolidayEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
