import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDescComponent } from './offer-desc.component';

describe('OfferDescComponent', () => {
  let component: OfferDescComponent;
  let fixture: ComponentFixture<OfferDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferDescComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
