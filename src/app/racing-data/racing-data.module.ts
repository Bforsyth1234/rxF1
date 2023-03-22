import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RacingDataPageRoutingModule } from './racing-data-routing.module';

import { RacingDataPage } from './racing-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RacingDataPageRoutingModule
  ],
  declarations: [RacingDataPage]
})
export class RacingDataPageModule {}
