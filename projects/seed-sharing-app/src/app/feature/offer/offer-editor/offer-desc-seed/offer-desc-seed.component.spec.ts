import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDescSeedComponent } from './offer-desc-seed.component';

describe('OfferDescSeedComponent', () => {
  let component: OfferDescSeedComponent;
  let fixture: ComponentFixture<OfferDescSeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferDescSeedComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDescSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
