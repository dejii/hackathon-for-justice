import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessStoryPage } from './success-story';

@NgModule({
  declarations: [
    SuccessStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessStoryPage),
  ],
})
export class SuccessStoryPageModule {}
