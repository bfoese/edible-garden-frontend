import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleSwitchComponent } from './locale-switch.component';

describe('LocaleSwitchComponent', () => {
  let component: LocaleSwitchComponent;
  let fixture: ComponentFixture<LocaleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocaleSwitchComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
