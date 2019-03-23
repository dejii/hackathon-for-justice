import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../services/app.service";
import {NgForm} from "@angular/forms";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {clone} from "../../globals";

@Component({
    selector: 'app-add-location',
    templateUrl: './add-location.component.html',
    styles: []
})
export class AddLocationComponent implements OnInit {

    lgas = [];
    wards = [];

    selectedStateId = '';
    selectedLgaId = '';

    states = [
        'ABIA',
        'ADAMAWA',
        'AKWA IBOM',
        'ANAMBRA',
        'BAUCHI',
        'BAYELSA',
        'BENUE',
        'BORNU',
        'CROSS RIVER',
        'DELTA',
        'EBONYI',
        'EDO',
        'EKITI',
        'ENUGU',
        'GOMBE',
        'IMO',
        'JIGAWA',
        'KADUNA',
        'KANO',
        'KATSINA',
        'KEBBI',
        'KOGI',
        'KWARA',
        'LAGOS',
        'NASARAWA',
        'NIGER',
        'OGUN',
        'ONDO',
        'OSUN',
        'OYO',
        'PLATEAU',
        'RIVERS',
        'SOKOTO',
        'TARABA',
        'YOBE',
        'ZAMFARA',
        'FCT ABUJA'
    ];

    constructor(private toastr: ToastrService, private appService: AppService) {
    }

    ngOnInit() {
        // this.getLGAs(1);
    }

    getLGAs(stateId) {
        this.lgas = [];
        if (stateId) {
            this.selectedStateId = stateId;
            this.appService.getLGAs(stateId)
                .subscribe((res: any) => {
                    if (res.statusCode === 200) {
                        this.lgas = res.data;
                        console.log(this.lgas)

                    } else {
                        this.toastr.error(res.message);
                    }
                }, (err) => {
                    this.toastr.error(err.error ? err.error.message : 'Error occurred. Try checking your internet connection');
                });
        }
    }

    getWards(lgaId) {
        this.wards = [];
        if (lgaId) {
            this.selectedLgaId = lgaId;
            this.appService.getWards(this.selectedStateId, lgaId)
                .subscribe((res: any) => {
                    // console.log(this.lgas)
                    console.log(this.wards);
                    if (res.statusCode === 200) {
                        this.wards = res.data;
                        console.log(this.wards)

                    } else {
                        this.toastr.error(res.message);
                    }
                }, (err) => {
                    this.toastr.error(err.error ? err.error.message : 'Error occurred. Try checking your internet connection');
                });
        }
    }


    addLocation(form: NgForm) {
        console.log(form.value);
        const _location = form.value;
        const stateName = this.states[Number(_location.state) - 1]
        const ward = this.wards.find(w => _location.ward === w.wa_id);
        const lga = this.lgas.find(l => _location.lga === l.lg_id);
        const location: any = {
            stateName,
            lga,
            description: _location.description,
            gender: _location.gender,
            phoneNumber: _location.phoneNumber
        };
        if (ward) {
            location.ward = ward;
        }
        console.log(location)
        this.appService.addLocation(location)
            .subscribe((res: any) => {
                if (res.statusCode === 200) {
                    this.toastr.success(res.message);
                    form.reset();
                } else {
                    this.toastr.error(res.message)
                }
            }, (err) => {
                this.toastr.error(err.error ? err.error.message : 'Error occurred. Try checking your internet connection');
            })
    }

}
