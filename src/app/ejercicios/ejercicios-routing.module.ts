import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjerciciosPage } from './ejercicios.page';

const routes: Routes = [
  {
    path: '',
    component: EjerciciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjerciciosPageRoutingModule {}
