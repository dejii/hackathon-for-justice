import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
  }

    get currentUserObservable(): any {
        return this.afAuth.authState;
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

}
