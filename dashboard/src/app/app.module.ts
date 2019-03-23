import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routing} from './app.routing';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {SharedModule} from './shared/shared.module';
import {JwtModule} from '@auth0/angular-jwt';
import {AddLocationComponent} from './components/add-location/add-location.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import {HomeComponent} from './components/home/home.component';

export function tokenGetter() {
    return localStorage.getItem('id_token');
}

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    // tosUrl: '<your-tos-link>',
    // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        AddLocationComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpClientModule,
        NgProgressModule.forRoot({
            spinnerPosition: 'right',
            spinner: true,
            color: '#2204ff'
        }),
        SharedModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter
            }
        }),
        FirebaseUIModule.forRoot(firebaseUiAuthConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
