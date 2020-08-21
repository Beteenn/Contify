import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpassmessageComponent } from './forgotpassmessage.component';

describe('ForgotpassmessageComponent', () => {
  let component: ForgotpassmessageComponent;
  let fixture: ComponentFixture<ForgotpassmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpassmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpassmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
