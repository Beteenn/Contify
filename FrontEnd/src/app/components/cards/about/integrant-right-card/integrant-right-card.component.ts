import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'integrant-right-card',
  templateUrl: './integrant-right-card.component.html',
  styleUrls: ['./integrant-right-card.component.scss']
})
export class IntegrantRightCardComponent implements OnInit {

  @Input() name: string;
  @Input() function: string;
  @Input() description: string;
  @Input() githubLink: string;
  @Input() linkedinLink: string;
  @Input() imagePath: string;

  constructor() { }

  ngOnInit(): void {
  }

}
