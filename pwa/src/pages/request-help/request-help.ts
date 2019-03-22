import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {finalize, tap} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {v4 as uuid} from 'uuid';
import {AngularFireStorage} from "@angular/fire/storage";
import {WebcamImage, WebcamInitError} from "ngx-webcam";
import {PwaProvider} from "../../providers/pwa/pwa";

/**
 * Generated class for the RequestHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-help',
  templateUrl: 'request-help.html',
})
export class RequestHelpPage {
  base64Picture = '';
  showPreview = false;
  showUploadPercent = false;
  uploadPercent: Observable<number | undefined>;
  private uploadUrl = '';
  showMap = false
  private filePath = '';
  formContact = '';

  zoom = 16;

  formName = '';

  victim = 'yes';
  lng = '';
  lat = '';

  positions = [];
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  formattedAddress = '';
  disableButton = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController, private storage: AngularFireStorage,
              private pwaProvider: PwaProvider, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    const displayLocationInfo = (position) => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
      this.positions.push(this.lat, this.lng)
      this.showMap = true

      const toast = this.toastCtrl.create({
        message: 'Location copied!',
        position: 'top',
        duration: 3000
      });
      toast.present();

      this.pwaProvider.getLocation(this.lat, this.lng)
        .subscribe((data: any) => {
          console.log(data)
          if (data.results[0].formatted_address) {
            console.log(data)
            this.formattedAddress = data.results[0].formatted_address;
          } else {
            this.formattedAddress = `LatLng: ${this.lat}, ${this.lng}`
          }
        }, (e) => {
          console.log(e)
        })

      console.log(`longitude: ${ this.lng } | latitude: ${ this.lat }`);
    };
    console.log('sdfsd')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);


    } else {
      const toast = this.toastCtrl.create({
        message: 'Location not supported. Type your location',
        position: 'top',
        duration: 3000
      });
      toast.present();
    }
  }

  fullScreen() {
    document.body.requestFullscreen();
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array
  }

  onIdle(event) {
    console.log('map', event.target);
  }

  onMarkerInit(marker) {
    console.log('marker', marker);
    // this.positions.push(this.positions.push([this.lat, this.lng]));
  }

  onMapClick(event) {
    // this.positions.push(this.positions.push([[this.lat, this.lng]]));
  }

  getLocation() {
    const displayLocationInfo = (position) => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;

      const toast = this.toastCtrl.create({
        message: 'Location copied!',
        position: 'top',
        duration: 3000
      });
      toast.present();

      console.log(`longitude: ${ this.lng } | latitude: ${ this.lat }`);
    };

    const video: any = document.getElementById('video');

    console.log(video)


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);


    } else {
      const toast = this.toastCtrl.create({
        message: 'Location not supported. Type your location',
        position: 'top',
        duration: 3000
      });
      toast.present();
    }
  }

  requestHelpVictim(form: NgForm) {

  }


  requestHelpNonVictim(form: NgForm) {

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

  uploadFile(event?) {
    // const ref = this.storage.ref(filePath);
    // const task = ref.putString(this.base64String);
    // const file = event.target.files[0];
    this.filePath = uuid();
    const ref = this.storage.ref(this.filePath);
    const task = ref.putString(this.webcamImage.imageAsDataUrl, 'data_url');

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        return this.setImageUrl(ref.getDownloadURL());
      })
    )
      .subscribe();
  }

  setImageUrl($imageURL: Observable<any>) {
    $imageURL.pipe(
      tap((url: string) => {
        console.log(url);
        this.disableButton = false;
        this.uploadUrl = url;
      })
    )
      .subscribe();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.uploadFile()
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();


  }

  upload() {
    this.uploadFile()

  }
  requestHelp() {


    const payload = {
      name: this.formName,
      photoUrl: this.uploadUrl,
      lng: this.lng,
      lat: this.lat,
      contact: this.formContact
    }
    console.log(payload)

    const loader = this.loadingCtrl.create();
    loader.present();


    this.pwaProvider.requestHelp(payload)
      .subscribe((res: any) => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: res.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        console.log(res)
        if (res.statusCode === 200) {

        }
      }, (err) => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: err.error ? err.error.message : 'Check your internet connection',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })

  }

  async getAddress(lat, lng) {
    return this.pwaProvider.getLocation(lat, lng).toPromise();
  }


}
