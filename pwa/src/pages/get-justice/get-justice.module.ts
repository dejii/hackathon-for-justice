import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetJusticePage } from './get-justice';

@NgModule({
  declarations: [
    GetJusticePage,
  ],
  imports: [
    IonicPageModule.forChild(GetJusticePage),
  ],
})
export class GetJusticePageModule {}
