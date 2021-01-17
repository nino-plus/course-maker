import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Course } from 'src/app/interfaces/course';
import { Question } from 'src/app/interfaces/question';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  private currentPosition: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral = {
    lat: 35.681162843979585,
    lng: 139.76662332460555,
  };
  zoom = 14;
  markerPositions: google.maps.LatLngLiteral[] = new Array(3).fill(null);
  display: google.maps.LatLngLiteral;
  form: FormGroup;

  imageFiles: string[] = new Array(3).fill(null);

  isEditable = false;
  maxTitleLength = 30;

  get questionForms() {
    return this.form.get('questions') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.maxLength(this.maxTitleLength)],
      ],
      questions: this.fb.array([
        this.fb.group({
          text: [''],
          hint: [''],
          answer: [''],
        }),
        this.fb.group({
          text: [''],
          hint: [''],
          answer: [''],
        }),
        this.fb.group({
          text: [''],
          hint: [''],
          answer: [''],
        }),
      ]),
    });
  }

  onCroppedImage(image: string, i: number): void {
    this.imageFiles[i] = image;
  }

  setMarker(event: google.maps.MouseEvent, i: number) {
    this.markerPositions[i] = event.latLng.toJSON();
  }

  async setImageToStorage(
    couseId: string,
    file: string,
    i: number
  ): Promise<string> {
    const result = await this.storage
      .ref(`courses/${couseId}/question${i}`)
      .putString(file, 'data_url');
    return result.ref.getDownloadURL();
  }

  async submit() {
    const courseId = this.db.createId();
    const url = this.imageFiles.map((image, i) => {
      if (image) {
        return this.setImageToStorage(courseId, image, i);
      } else {
        return null;
      }
    });
    const questions: Question[] = this.questionForms.value.map(
      (question: Omit<Question, 'imageURL' | 'mapPosition'>, i: number) => {
        question['mapPosition'] = this.markerPositions[i];
        question['imageURL'] = this.imageFiles[i];
        return question;
      }
    );

    const newValue: Course = {
      courseId,
      creatorId: this.authService.uid,
      createdAt: firebase.firestore.Timestamp.now(),
      title: this.form.get('title').value,
      questions,
      playCount: 0,
      completedUserCount: 0,
    };

    this.courseService.createCourse(newValue);
  }
}
