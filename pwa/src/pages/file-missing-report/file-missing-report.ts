import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {finalize, tap} from "rxjs/operators";
import {v4 as uuid} from 'uuid';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {PwaProvider} from "../../providers/pwa/pwa";


/**
 * Generated class for the FileMissingReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-file-missing-report',
  templateUrl: 'file-missing-report.html',
})
export class FileMissingReportPage {
  base64Picture = '';
  showPreview = false;
  showUploadPercent = false;
  uploadPercent: Observable<number | undefined>;
  private uploadUrl = '';
  private filePath = '';


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: AngularFireStorage, private pwaProvider: PwaProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  changeListener($event): void {
    this.readThis($event.target);
    this.uploadFile($event)
  }

  readThis(inputValue: any): void {
    this.showPreview = false;
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Picture = myReader.result;
      this.showPreview = true;

    };
    myReader.readAsDataURL(file);
  }

  uploadFile(event) {
    // const ref = this.storage.ref(filePath);
    // const task = ref.putString(this.base64String);
    const file = event.target.files[0];
    this.filePath = uuid();
    const fileRef = this.storage.ref(this.filePath);
    this.showUploadPercent = true;
    const task = this.storage.upload(this.filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        return this.setImageUrl(fileRef.getDownloadURL());
      })
    )
      .subscribe();
  }

  setImageUrl($imageURL: Observable<any>) {
    $imageURL.pipe(
      tap((url: string) => {
        console.log(url);
        this.uploadUrl = url;
      })
    )
      .subscribe();
  }

  fileReport(form: NgForm) {
    const payload = {
      name: form.value.name,
      age: form.value.age,
      description: form.value.description,
      photoUrl: this.uploadUrl,
      filePath: this.filePath
    };

    console.log(payload)

    this.pwaProvider.fileMissingReport(payload)
      .subscribe((res: any) => {
        if (res.statusCode === 200) {

        } else {

        }

        const toast = this.toastCtrl.create({
          message: res.message,
          position: 'top',
          duration: 3000
        });
        toast.present();
      });
  }

}
