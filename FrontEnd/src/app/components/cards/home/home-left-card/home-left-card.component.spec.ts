import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeftCardComponent } from './home-left-card.component';

describe('HomeLeftCardComponent', () => {
  let component: HomeLeftCardComponent;
  let fixture: ComponentFixture<HomeLeftCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLeftCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
