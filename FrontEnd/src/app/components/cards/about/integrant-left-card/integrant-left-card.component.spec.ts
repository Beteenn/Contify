import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrantLeftCardComponent } from './integrant-left-card.component';

describe('IntegrantLeftCardComponent', () => {
  let component: IntegrantLeftCardComponent;
  let fixture: ComponentFixture<IntegrantLeftCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrantLeftCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrantLeftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
