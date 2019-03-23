import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/app.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-distress-reports',
  templateUrl: './distress-reports.component.html',
  styles: []
})
export class DistressReportsComponent implements OnInit {

    distressReports = [];

    distress_is_set = false;

    page = 1;
    limit = 10;

    constructor(private appService: AppService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getUSSDReports();
    }

    previewImage(url) {
      console.log(url)
        window.open(url, '_blank');
    }

    locationDetails(lat, lng) {
        // window.open(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD2LimKZCfSz8TjQkkxUpzXiT_dXHh8XCw`, '_blank');
        window.open(`https://www.google.com/maps/place/${lat},${lng}`, '_blank');
    }

    getUSSDReports() {
        this.appService.getDistressReports()
            .subscribe((res: any) => {
                this.distress_is_set = true;
                if (res.statusCode === 200) {
                    this.distressReports = res.data;
                } else {

                }
            });
    }

}
