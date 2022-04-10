import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeContentComponent } from './commande-content.component';

describe('CommandeContentComponent', () => {
  let component: CommandeContentComponent;
  let fixture: ComponentFixture<CommandeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
