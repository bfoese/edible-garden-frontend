import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowingManualCatalogComponent } from './growing-manual-catalog.component';

describe('GrowingManualCatalogComponent', () => {
  let component: GrowingManualCatalogComponent;
  let fixture: ComponentFixture<GrowingManualCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrowingManualCatalogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowingManualCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
