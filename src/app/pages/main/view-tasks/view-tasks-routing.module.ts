import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTasksPage } from './view-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTasksPageRoutingModule {}
