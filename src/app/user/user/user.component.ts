import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { switchMap } from 'rxjs/operators';
import { CourseWithUser } from 'src/app/interfaces/course';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isMyAccount: boolean;
  $user: Observable<User> = this.authService.user$;
  imageFile: string;
  nameForm = new FormControl('', [Validators.maxLength(30)]);

  coursesWithUser$: Observable<CourseWithUser[]> = this.route.paramMap.pipe(
    switchMap((params) => {
      if (params) {
        return this.courseService.getCoursesWithUserByCreatorId(
          params.get('creatorId')
        );
      } else {
        return of(null);
      }
    })
  );
  creator$: Observable<User> = this.route.paramMap.pipe(
    switchMap((params) => {
      if (params) {
        return this.userService.getUser(params.get('creatorId'));
      } else {
        return of(null);
      }
    })
  );
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('creatorId') === this.authService.uid) {
        this.isMyAccount = true;
      } else {
        this.isMyAccount = false;
      }
    });
  }
  onCroppedImage(image: string): void {
    this.imageFile = image;
  }
  updateUserAvatar(): Promise<void> {
    return this.userService
      .updateUserAvatar(this.authService.uid, this.imageFile)
      .then(() => {
        this.snackBar.open('変更されました', null);
        this.imageFile = null;
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null);
      });
  }
  updateUserName(): Promise<void> {
    const newUserName = this.nameForm.value;
    return this.userService
      .updateUserName(this.authService.uid, newUserName)
      .then(() => {
        this.snackBar.open('変更されました', null);
        this.nameForm.reset();
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null);
      });
  }

  openDeleteDialog(): void {
    this.dialog
      .open(DeleteDialogComponent, {
        restoreFocus: false,
        autoFocus: false,
        data: {
          title: 'アカウント',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.userService.deleteUser();
        }
      });
  }
}
