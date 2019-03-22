import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPotentialCasePage } from './upload-potential-case';

@NgModule({
  declarations: [
    UploadPotentialCasePage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPotentialCasePage),
  ],
})
export class UploadPotentialCasePageModule {}
