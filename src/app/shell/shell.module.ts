import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
  ],
})
export class ShellModule {}
