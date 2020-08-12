import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-left-card',
  templateUrl: './home-left-card.component.html',
  styleUrls: ['./home-left-card.component.scss']
})
export class HomeLeftCardComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() cardDescription: string;
  @Input() cardImagePath: string;

  constructor() { }

  ngOnInit(): void {
  }

}
