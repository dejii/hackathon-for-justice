import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiUrl} from "../../app/environment";

/*
  Generated class for the PwaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PwaProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PwaProvider Provider');
  }

  fileMissingReport(payload) {
    return this.http.post(`${apiUrl}/file_report`, payload);
  }

  requestHelp(payload) {
    return this.http.post(`${apiUrl}/request_help`, payload);
  }

  getLocation(lat, lng) {
    console.log(lat, lng)
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD2LimKZCfSz8TjQkkxUpzXiT_dXHh8XCw`);
  }

  uploadPhoto(payload) {
    return this.http.post(`${apiUrl}/upload_photo`, payload);
  }

}
