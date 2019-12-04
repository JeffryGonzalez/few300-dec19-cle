import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HolidayListItem } from '../../../models';

@Component({
  selector: 'app-recipient-entry',
  templateUrl: './recipient-entry.component.html',
  styleUrls: ['./recipient-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipientEntryComponent implements OnInit {

  @Input() holidays: HolidayListItem[];
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: 'Jeff',
      email: '',
      holidayIds: []
    });
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.form.value);
  }
}
