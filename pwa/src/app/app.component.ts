import {Component, ViewChild} from '@angular/core';

import { TabsPage } from '../pages/tabs/tabs';
import {Nav} from "ionic-angular";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'RequestHelpPage';

  pages: Array<{title: string, component: any}>;

  constructor() {

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: 'HomePage' },
      // { title: 'File Report', component: 'FileMissingReportPage'},
      { title: 'Request Help', component: 'RequestHelpPage'},
      { title: 'Get Justice', component: 'GetJusticePage'}
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title !== 'Results') {
      this.nav.setRoot(page.component);
    }
  }
}
