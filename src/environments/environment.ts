// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
export const serverUrl = 'https://37.116.163.199:5001/'
//export const serverUrl = 'http://localhost:5000/'
export const imagesUrl = 'https://raw.githubusercontent.com/canerandagio1983/CarsMarketPlace/master/assets/images/'
export const carsImagesUrl = 'https://raw.githubusercontent.com/canerandagio1983/CarsMarketPlace/master/assets/CarsImages/'
export const useMock = true