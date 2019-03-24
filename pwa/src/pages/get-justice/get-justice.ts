import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {PwaProvider} from "../../providers/pwa/pwa";

/**
 * Generated class for the GetJusticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-get-justice',
  templateUrl: 'get-justice.html',
})
export class GetJusticePage {
  language = 'English';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private pwaProvider: PwaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetJusticePage');
  }

  share(form: NgForm) {
    console.log(form.value)
    const payload = form.value;

    console.log(payload)
    const loader = this.loadingCtrl.create();
    loader.present();

    this.pwaProvider.shareStory(payload)
      .subscribe((res: any) => {
        loader.dismiss();
        console.log(res)
        const toast = this.toastCtrl.create({
          message: res.message,
          position: 'top',
          duration: 3000
        })
        toast.present();
        if (res.statusCode === 200) {
          this.navCtrl.setRoot('SuccessStoryPage');
        }
      }, (err) => {
        loader.dismiss();
        console.log(err)
      })
  }

}
