import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-right-card',
  templateUrl: './home-right-card.component.html',
  styleUrls: ['./home-right-card.component.scss']
})
export class HomeRightCardComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() cardDescription: string;
  @Input() cardImagePath: string;

  constructor() { }

  ngOnInit(): void {
  }

}
