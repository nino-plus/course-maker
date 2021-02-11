import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isMyAccount: boolean;
  $user: Observable<User> = this.authService.user$;
  imageFile: string;
  nameForm = new FormControl('', [Validators.maxLength(30)]);

  // creator$: Observable<User> = this.route.paramMap.pipe(
  //   switchMap((params) => {
  //     if (params) {
  //       return this.userService.getUser(params.get('creatorId'));
  //     } else {
  //       return of(null);
  //     }
  //   })
  // );
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('creatorId') === this.authService.uid) {
        this.isMyAccount = true;
      } else {
        this.isMyAccount = false;
      }
      console.log(this.userService.getUser(this.authService.uid));
      console.log(this.authService.uid);
    });
  }
  onCroppedImage(image: string) {
    this.imageFile = image;
  }
  updateUserAvatar() {
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
}
