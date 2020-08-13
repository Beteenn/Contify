import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrantRightCardComponent } from './integrant-right-card.component';

describe('IntegrantRightCardComponent', () => {
  let component: IntegrantRightCardComponent;
  let fixture: ComponentFixture<IntegrantRightCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrantRightCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrantRightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
