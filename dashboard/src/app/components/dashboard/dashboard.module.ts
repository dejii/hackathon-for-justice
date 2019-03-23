import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgProgressModule} from '@ngx-progressbar/core';
import { LayoutComponent } from './layout/layout.component';
import { UssdReportsComponent } from './ussd-reports/ussd-reports.component';
import { DistressReportsComponent } from './distress-reports/distress-reports.component';
import { FullReportsComponent } from './full-reports/full-reports.component';
import { IndexComponent } from './index/index.component';
import {AgmCoreModule} from '@agm/core';


@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    NgProgressModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyD2LimKZCfSz8TjQkkxUpzXiT_dXHh8XCw'
      }),
  ],
  declarations: [
  LayoutComponent,
  UssdReportsComponent,
  DistressReportsComponent,
  FullReportsComponent,
  IndexComponent]
})
export class DashboardModule { }
