import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotFamilyTreeComponent } from './bot-family-tree.component';

describe('BotFamilyTreeComponent', () => {
  let component: BotFamilyTreeComponent;
  let fixture: ComponentFixture<BotFamilyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotFamilyTreeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotFamilyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
