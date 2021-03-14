import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgBrandingComponent } from './eg-branding.component';

describe('EgBrandingComponent', () => {
  let component: EgBrandingComponent;
  let fixture: ComponentFixture<EgBrandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgBrandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
