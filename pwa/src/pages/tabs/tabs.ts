import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'FileMissingReportPage';
  tab3Root = 'UploadPotentialCasePage';

  constructor() {

  }
}
