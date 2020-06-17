// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDJiqWShZjiDuWPJCCoyGAe5qkl6vugVZE',
    authDomain: 'angular-tdd-7c90f.firebaseapp.com',
    databaseURL: 'https://angular-tdd-7c90f.firebaseio.com',
    projectId: 'angular-tdd-7c90f',
    storageBucket: 'angular-tdd-7c90f.appspot.com',
    messagingSenderId: '917167874450',
    appId: '1:917167874450:web:b75dbc36d862284092214b'
  },
  apiUrl: 'https://firestore.googleapis.com/v1/projects/angular-tdd-7c90f/databases/(default)/documents/cart?key=AIzaSyDJiqWShZjiDuWPJCCoyGAe5qkl6vugVZE',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
