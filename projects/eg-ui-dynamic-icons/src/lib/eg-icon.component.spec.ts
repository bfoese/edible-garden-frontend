import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgIconComponent } from './eg-icon.component';

describe('EgIconComponent', () => {
  let component: EgIconComponent;
  let fixture: ComponentFixture<EgIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
