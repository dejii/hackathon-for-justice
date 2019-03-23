import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/auth";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    constructor(private authService: AuthService, private toastr: ToastrService,
                private router: Router, private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.subscription = this.afAuth.authState.subscribe((response) => {
            if (response) {
                console.log('Logged in :)');
                this.router.navigate(['/dashboard']);
            } else {
                console.log('Logged out :(');
            }
        });


    }


    successCallback(result) {
        // console.log(result)
        this.router.navigate(['/dashboard']);
    }

    errorCallback(result) {
        this.toastr.error('An error occurred')
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();

        }
    }

}
