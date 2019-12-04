import { Component, OnInit, Input } from '@angular/core';
import { RecipientListModel } from '../../../models';

@Component({
  selector: 'app-recipient-list',
  templateUrl: './recipient-list.component.html',
  styleUrls: ['./recipient-list.component.scss']
})
export class RecipientListComponent implements OnInit {

  @Input() model: RecipientListModel[] = [];
  constructor() { }

  ngOnInit() {
  }

}
