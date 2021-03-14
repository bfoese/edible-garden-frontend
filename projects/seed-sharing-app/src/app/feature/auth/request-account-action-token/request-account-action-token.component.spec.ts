import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccountActionTokenComponent } from './request-account-action-token.component';

describe('RequestAccountActionTokenComponent', () => {
  let component: RequestAccountActionTokenComponent;
  let fixture: ComponentFixture<RequestAccountActionTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestAccountActionTokenComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAccountActionTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
