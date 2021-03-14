import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgDualPaneCurtainLayoutComponent } from './dual-pane-curtain-layout.component';

describe('EgDualPaneCurtainLayoutComponent', () => {
  let component: EgDualPaneCurtainLayoutComponent;
  let fixture: ComponentFixture<EgDualPaneCurtainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgDualPaneCurtainLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgDualPaneCurtainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
