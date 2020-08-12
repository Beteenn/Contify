import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'integrant-left-card',
  templateUrl: './integrant-left-card.component.html',
  styleUrls: ['./integrant-left-card.component.scss']
})
export class IntegrantLeftCardComponent implements OnInit {

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
