import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {UssdReportsComponent} from './ussd-reports/ussd-reports.component';
import {DistressReportsComponent} from './distress-reports/distress-reports.component';
import {FullReportsComponent} from './full-reports/full-reports.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {path: '', component: IndexComponent},
            {path: 'ussd-reports', component: UssdReportsComponent},
            {path: 'full-reports', component: FullReportsComponent},
            {path: 'distress-reports', component: DistressReportsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
