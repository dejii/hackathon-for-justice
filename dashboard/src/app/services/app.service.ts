import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getWards(stateId, lgaId) {
      return this.http.post(`${environment.apiUrl}/get_inec_ward`, {stateId, lgaId});
  }

  getLGAs(stateId) {
      return this.http.post(`${environment.apiUrl}/get_inec_lga`, {stateId});
  }


  addLocation(location) {
      return this.http.post(`${environment.apiUrl}/add_location`, {location});
  }

  getLocations(payload = {}) {
      return this.http.post(`${environment.apiUrl}/get_corper_locations`, payload);
  }

  getUSSDReports() {
      return this.http.get(`${environment.apiUrl}/get_ussd_reports`);
  }

  getFullReports() {
      return this.http.get(`${environment.apiUrl}/get_full_reports`);
  }

  getDistressReports() {
      return this.http.get(`${environment.apiUrl}/get_distress_reports`);
  }
}
