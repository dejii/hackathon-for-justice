import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '../../../services/app.service';
import {DUMMY_PROFILE_IMAGE_BASE64} from '../../../globals';
declare const $;

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styles: [
            `

        `
    ]
})
export class LayoutComponent implements OnInit {

    user = {
        avatar: ''
    };

    dummy_profile_image = DUMMY_PROFILE_IMAGE_BASE64;

    constructor(private authService: AuthService, private router: Router,
                private appService: AppService, private toastr: ToastrService) {
    }

    ngOnInit() {

    }

    showSidebar() {
        $('.o-page').toggleClass('is-sidebar-open');
    }

    closeSideBar() {
        if ($('.o-page').hasClass('is-sidebar-open')) {
            $('.o-page').toggleClass('is-sidebar-open');
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    // logout() {
    //     this.authService.logout()
    //         .then(() => {
    //             this.router.navigate(['/login']);
    //         }, () => {
    //             localStorage.clear();
    //             this.router.navigate(['/login']);
    //         });
    // }

}
