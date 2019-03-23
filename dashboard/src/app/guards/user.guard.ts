import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {t} from '@angular/core/src/render3';
import {map, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {


  constructor(public authService: AuthService, public router: Router, private toastr: ToastrService) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        // return this.authService.currentUserObservable.pipe(
        //     take(1),
        //     map(user => {
        //         return !!user;
        //     }),
        //     tap( loggedIn => {
        //         if (!loggedIn) {
        //             this.toastr.error('Please log in to continue');
        //             this.router.navigate(['/login']);
        //         }
        //     })
        // );
        return true;
    }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        // return this.authService.currentUserObservable.pipe(
        //     take(1),
        //     map(user => {
        //         return !!user;
        //     }),
        //     tap( loggedIn => {
        //         if (!loggedIn) {
        //             this.toastr.error('Please log in to continue');
        //             this.router.navigate(['/login']);
        //         }
        //     })
        // );
        return true;
    }
}
