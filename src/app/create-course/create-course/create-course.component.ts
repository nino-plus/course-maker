import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Course } from 'src/app/interfaces/course';
import { Question } from 'src/app/interfaces/question';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  readonly isCreatePage = true;
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
  thumbnail: string;

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
    private storage: AngularFireStorage,
    private router: Router,
    private snackBar: MatSnackBar
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
          text: [
            '',
            [Validators.required, Validators.maxLength(this.maxTitleLength)],
          ],
          hint: ['', [Validators.maxLength(this.maxTitleLength)]],
          answer: [
            '',
            [Validators.required, Validators.maxLength(this.maxTitleLength)],
          ],
        }),
        this.fb.group({
          text: [
            '',
            [Validators.required, Validators.maxLength(this.maxTitleLength)],
          ],
          hint: ['', [Validators.maxLength(this.maxTitleLength)]],
          answer: [
            '',
            [Validators.required, Validators.maxLength(this.maxTitleLength)],
          ],
        }),
        this.fb.group({
          text: [
            '',
            [Validators.required, Validators.maxLength(this.maxTitleLength)],
          ],
          hint: ['', [Validators.maxLength(this.maxTitleLength)]],
          answer: [
            '',
            [Validators.required, Validators.maxLength(this.maxTitleLength)],
          ],
        }),
      ]),
    });
  }

  onCroppedImage(image: string, i: number): void {
    this.imageFiles[i] = image;
  }

  thumbnailImage(image: string): void {
    this.thumbnail = image;
  }

  setMarker(event: google.maps.MouseEvent, i: number) {
    this.markerPositions[i] = event.latLng.toJSON();
  }

  async setQuestionImageToStorage(
    couseId: string,
    file: string,
    i: number
  ): Promise<string> {
    const result = await this.storage
      .ref(`courses/${couseId}/question${i + 1}`)
      .putString(file, 'data_url');
    return result.ref.getDownloadURL();
  }

  async setThumbnailImageToStorage(
    couseId: string,
    file: string
  ): Promise<string> {
    const result = await this.storage
      .ref(`courses/${couseId}/thumbnail`)
      .putString(file, 'data_url');
    return result.ref.getDownloadURL();
  }

  async setQuestionImagesToStorage(
    id: string,
    files: string[]
  ): Promise<string[]> {
    const tasks = await Promise.all(
      files.map((file, index) => {
        if (file !== null) {
          const ref = this.storage.ref(`courses/${id}/question-${index + 1}`);
          return ref.putString(file, 'data_url');
        }
      })
    );
    const imageUrls = [];
    for (const task of tasks) {
      if (task) {
        imageUrls.push(await task.ref.getDownloadURL());
      } else {
        imageUrls.push(null);
      }
    }
    return imageUrls;
  }

  async submit() {
    const courseId = this.db.createId();
    const url = await this.setQuestionImagesToStorage(
      courseId,
      this.imageFiles
    );
    let thumbnailURL = '';
    if (this.thumbnail) {
      thumbnailURL = await this.setThumbnailImageToStorage(
        courseId,
        this.thumbnail
      );
    }
    const questions: Question[] = this.questionForms.value.map(
      (question: Omit<Question, 'imageURL' | 'mapPosition'>, i: number) => {
        question['mapPosition'] = this.markerPositions[i];
        question['imageURL'] = url[i];
        return question;
      }
    );

    const newValue: Course = {
      courseId,
      creatorId: this.authService.uid,
      thumbnailURL,
      createdAt: firebase.firestore.Timestamp.now(),
      title: this.form.get('title').value,
      questions,
      playCount: 0,
      clearUserCount: 0,
    };

    this.courseService.createCourse(newValue).then(() => {
      this.snackBar.open('コースを作成しました！');
      this.router.navigate(['/']);
    });
  }
}
