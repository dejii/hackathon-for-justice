import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/app.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-full-reports',
  templateUrl: './full-reports.component.html',
  styles: []
})
export class FullReportsComponent implements OnInit {

    fullReports = [];

    reports_is_set = false;

    page = 1;
    limit = 10;

    constructor(private appService: AppService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getFullReports();
    }

    previewImage(url) {
        console.log(url)
        window.open(url, '_blank');
    }

    locationDetails(lat, lng) {
        // window.open(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD2LimKZCfSz8TjQkkxUpzXiT_dXHh8XCw`, '_blank');
        window.open(`https://www.google.com/maps/place/${lat},${lng}`, '_blank');
    }

    getFullReports() {
        this.appService.getFullReports()
            .subscribe((res: any) => {
                this.reports_is_set = true;
                if (res.statusCode === 200) {
                    this.fullReports = res.data;
                } else {

                }
            });
    }


}
