import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { HolidayListItem } from '../../../models';
import { Store } from '@ngrx/store';
import { GiftGivingState } from '../../../reducers';
import * as actions from '../../../actions/recipients.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipient-entry',
  templateUrl: './recipient-entry.component.html',
  styleUrls: ['./recipient-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipientEntryComponent implements OnInit, OnDestroy {

  @Input() holidays: HolidayListItem[];
  form: FormGroup;
  holidaysArray: FormArray;
  name: FormControl;
  email: FormControl;
  changesSub: Subscription;
  constructor(private formBuilder: FormBuilder, private store: Store<GiftGivingState>) {
    this.holidaysArray = new FormArray([], minNumberOfSelectedCheckboxes(1));
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.changesSub = this.name.valueChanges.subscribe(v => console.log(v));
    this.email = new FormControl('', Validators.email);
    this.form = formBuilder.group({
      name: this.name,
      email: this.email,
      holidays: this.holidaysArray
    });

  }

  ngOnDestroy() {
    this.changesSub.unsubscribe();
  }
  createCheckboxes() {
    this.holidays.forEach((holiday, index) => {
      const control = new FormControl();
      this.holidaysArray.push(
        control
      );
    });
  }
  ngOnInit() {
    this.createCheckboxes();
  }

  submit(focusme: HTMLInputElement) {

    const selectedHolidayIds = this.form.value.holidays
      .map((v, i) => v ? this.holidays[i].id : null)
      .filter(v => v !== null);
    const name = this.form.value.name;
    const email = this.form.value.email;
    this.store.dispatch(actions.recipientAdded({ name, email, selectedHolidayIds }));
    focusme.focus();
    this.form.reset();
  }
}


function minNumberOfSelectedCheckboxes(min: number) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const numberSelected = formArray.controls
      .map(c => c.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return numberSelected >= min ? null : { required: true, needed: min };
  };

  return validator;
}
