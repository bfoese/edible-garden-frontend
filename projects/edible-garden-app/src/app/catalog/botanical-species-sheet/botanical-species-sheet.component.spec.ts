import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotanicalSpeciesSheetComponent } from './botanical-species-sheet.component';

describe('BotanicalSpeciesSheetComponent', () => {
  let component: BotanicalSpeciesSheetComponent;
  let fixture: ComponentFixture<BotanicalSpeciesSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotanicalSpeciesSheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotanicalSpeciesSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
