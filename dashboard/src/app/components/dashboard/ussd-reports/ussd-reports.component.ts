import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-ussd-reports',
    templateUrl: './ussd-reports.component.html',
    styles: []
})
export class UssdReportsComponent implements OnInit {

    ussdReports = [];

    ussd_is_set = false;

    page = 1;
    limit = 10;

    constructor(private appService: AppService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getUSSDReports();
    }

    getUSSDReports() {
        this.appService.getUSSDReports()
            .subscribe((res: any) => {
                this.ussd_is_set = true;
                if (res.statusCode === 200) {
                    this.ussdReports = res.data;
                } else {

                }
            });
    }

}
