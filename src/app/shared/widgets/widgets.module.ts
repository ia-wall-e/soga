import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [HeadComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[HeadComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WidgetsModule { }
