import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayCourseComponent } from './play-course.component';

describe('PlayCourseComponent', () => {
  let component: PlayCourseComponent;
  let fixture: ComponentFixture<PlayCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
