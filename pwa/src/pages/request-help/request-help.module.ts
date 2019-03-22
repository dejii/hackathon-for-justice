import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestHelpPage } from './request-help';
import {WebcamModule} from "ngx-webcam";
import {AgmCoreModule} from "@agm/core";
// import {NguiMapModule} from "@ngui/map";

@NgModule({
  declarations: [
    RequestHelpPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestHelpPage),
    WebcamModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyD2LimKZCfSz8TjQkkxUpzXiT_dXHh8XCw'
    // })
  //   NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyD2LimKZCfSz8TjQkkxUpzXiT_dXHh8XCw'})
  //   // NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB04nHQHhekGgCzchsmey9mnxy3PkQ2WMg'})
  // //  AIzaSyB04nHQHhekGgCzchsmey9mnxy3PkQ2WMg
  ],
})
export class RequestHelpPageModule {}
