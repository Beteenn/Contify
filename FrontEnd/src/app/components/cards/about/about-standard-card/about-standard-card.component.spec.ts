import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStandardCardComponent } from './about-standard-card.component';

describe('AboutStandardCardComponent', () => {
  let component: AboutStandardCardComponent;
  let fixture: ComponentFixture<AboutStandardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutStandardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStandardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
