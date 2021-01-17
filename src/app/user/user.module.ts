import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CropperModule } from '@deer-inc/ngx-croppie';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatSnackBarModule,
    CropperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class UserModule {}
