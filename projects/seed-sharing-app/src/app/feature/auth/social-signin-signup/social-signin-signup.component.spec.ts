import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSigninSignupComponent } from './social-signin-signup.component';

describe('SocialSigninSignupComponent', () => {
  let component: SocialSigninSignupComponent;
  let fixture: ComponentFixture<SocialSigninSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialSigninSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSigninSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
