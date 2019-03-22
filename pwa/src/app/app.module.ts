import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import {AngularFireModule} from "@angular/fire";
import {firebaseConfig} from "./environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import { PwaProvider } from '../providers/pwa/pwa';
import {HttpClientModule} from "@angular/common/http";
import {WebcamModule} from "ngx-webcam";
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PwaProvider
  ]
})
export class AppModule {}
