import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    NgProgressModule,
    NgProgressHttpModule,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    NgProgressModule,
    NgProgressHttpModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
