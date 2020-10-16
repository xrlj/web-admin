import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-etp-details',
  templateUrl: './etp-details.component.html',
  styleUrls: ['./etp-details.component.less']
})
export class EtpDetailsComponent implements OnInit {

  radioValue = 'A';
  inputValue: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }
}
