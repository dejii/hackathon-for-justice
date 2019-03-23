import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {AppService} from '../../../services/app.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [`
        agm-map {
            height: 500px;
        }
    `]
})
export class IndexComponent implements OnInit {

    distressReports = [];
    fullReports = [];
    ussdReports = [];

    title = 'My first AGM project';
    lat = 6.433234;
    lng = 3.4430506999999997;
    markers = [];

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.getReports();
    }


    getReports() {
        forkJoin(
            this.appService.getDistressReports(),
            this.appService.getFullReports(),
            this.appService.getUSSDReports()
        )
            .subscribe(([distress, full, ussd]: any) => {
                if (distress.statusCode === 200) {
                    this.distressReports = distress.data;
                    this.markers = distress.data.filter((d) => {
                        if (d.lng && d.lat) {
                            return true;
                        } else {
                            return false;
                        }
                    }).map((c => ({lat: c.lat, lng: c.lng})));
                    console.log(this.markers);
                }
                if (full.statusCode === 200) {
                    this.fullReports = full.data;
                }
                if (ussd.statusCode === 200) {
                    this.ussdReports = ussd.data;
                }
            });
    }

}
