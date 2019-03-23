// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    apiUrl: 'https://us-central1-hackathon-justice.cloudfunctions.net',
    firebase: {
        apiKey: "AIzaSyB04nHQHhekGgCzchsmey9mnxy3PkQ2WMg",
        authDomain: "hackathon-justice.firebaseapp.com",
        databaseURL: "https://hackathon-justice.firebaseio.com",
        projectId: "hackathon-justice",
        storageBucket: "hackathon-justice.appspot.com",
        messagingSenderId: "55717533425"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
