import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { UpdateTaskComponent } from './components/update-tasks/update-tasks.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksFilterComponent } from './components/tasks-filter/tasks-filter.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoginInputComponent,
    LogoComponent,
    UpdateTaskComponent,
    TasksFilterComponent
  ],
  exports:[
    HeaderComponent,
    LoginInputComponent,
    LogoComponent,
    UpdateTaskComponent,
    FormsModule,
    ReactiveFormsModule,
    TasksFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule { }
