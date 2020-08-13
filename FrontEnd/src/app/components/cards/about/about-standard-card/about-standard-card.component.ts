import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'about-standard-card',
  templateUrl: './about-standard-card.component.html',
  styleUrls: ['./about-standard-card.component.scss']
})
export class AboutStandardCardComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() description: string;
  @Input() description2: string;
  @Input() description3: string;
  @Input() imagePath: string;

  constructor() { }

  ngOnInit(): void {
  }

}
