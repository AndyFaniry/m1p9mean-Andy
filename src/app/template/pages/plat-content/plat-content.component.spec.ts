import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatContentComponent } from './plat-content.component';

describe('PlatContentComponent', () => {
  let component: PlatContentComponent;
  let fixture: ComponentFixture<PlatContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
