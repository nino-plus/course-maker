import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  center: google.maps.LatLngLiteral = {
    lat: 35.681162843979585,
    lng: 139.76662332460555,
  };
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral;
  display: google.maps.LatLngLiteral;
  form: FormGroup;
  imageFile: string;

  isEditable = false;
  maxTitleLength = 30;

  constructor(private fb: FormBuilder, private courseService: CourseService) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.maxLength(this.maxTitleLength)],
      ],
      question: this.fb.group({
        text: [''],
        hint: [''],
        answer: [''],
        position: [google.maps.LatLng],
      }),
    });
  }

  onCroppedImage(image: string): void {
    this.imageFile = image;
  }

  moveMap(event: google.maps.MouseEvent) {
    this.markerPosition = event.latLng.toJSON();
  }

  submit() {
    this.courseService.createCourse();
  }
}
