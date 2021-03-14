import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedSharingComponent } from './seed-sharing.component';

describe('SeedSharingComponent', () => {
  let component: SeedSharingComponent;
  let fixture: ComponentFixture<SeedSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeedSharingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
