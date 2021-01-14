import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FeatureComponent } from './feature/feature.component';
import { HeroComponent } from './hero/hero.component';
import { UseageComponent } from './useage/useage.component';


@NgModule({
  declarations: [WelcomeComponent, FeatureComponent, HeroComponent, UseageComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
