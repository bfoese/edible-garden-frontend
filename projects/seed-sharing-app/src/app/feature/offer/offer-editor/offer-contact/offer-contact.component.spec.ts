import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferContactComponent } from './offer-contact.component';

describe('OfferContactComponent', () => {
  let component: OfferContactComponent;
  let fixture: ComponentFixture<OfferContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferContactComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
