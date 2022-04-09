import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurContentComponent } from './livreur-content.component';

describe('LivreurContentComponent', () => {
  let component: LivreurContentComponent;
  let fixture: ComponentFixture<LivreurContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreurContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreurContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
