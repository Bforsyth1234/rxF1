import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RacingDataPage } from './racing-data.page';

const routes: Routes = [
  {
    path: '',
    component: RacingDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RacingDataPageRoutingModule {}
