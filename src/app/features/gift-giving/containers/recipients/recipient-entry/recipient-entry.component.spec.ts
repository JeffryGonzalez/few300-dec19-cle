import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientEntryComponent } from './recipient-entry.component';

describe('RecipientEntryComponent', () => {
  let component: RecipientEntryComponent;
  let fixture: ComponentFixture<RecipientEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
