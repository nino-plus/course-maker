import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseageComponent } from './useage.component';

describe('UseageComponent', () => {
  let component: UseageComponent;
  let fixture: ComponentFixture<UseageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
