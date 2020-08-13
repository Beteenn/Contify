import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() icon: string;
  @Input() cardType: string;
  @Input() value: number;

  constructor( ) { }

  ngOnInit(): void {

  }

}
