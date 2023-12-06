import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    LayoutComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
