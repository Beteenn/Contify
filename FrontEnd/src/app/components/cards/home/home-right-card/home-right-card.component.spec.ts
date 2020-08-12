import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRightCardComponent } from './home-right-card.component';

describe('HomeRightCardComponent', () => {
  let component: HomeRightCardComponent;
  let fixture: ComponentFixture<HomeRightCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRightCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
