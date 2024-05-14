import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Tasks } from 'src/app/models/tasks.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {

  selectedColor: string = '';// Variable para almacenar el color seleccionado

  // Función para seleccionar un color
  selectColor(color: string) {
    this.selectedColor = color;
    console.log('Color seleccionado:', color);
  }

  constructor() { }

  @Input() task: Tasks;// add

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;

  
  form1 = new FormGroup( {
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    all_day: new FormControl(''),
    start_date: new FormControl(''), //, [Validators.required]
    start_time: new FormControl(''),
    end_date: new FormControl(''),
    end_time: new FormControl(''),
    // color: new FormControl(''),//, [Validators.required]
    url: new FormControl(''),
    notes: new FormControl('')
  });


  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user');
    if(this.task) this.form1.setValue(this.task);
  }

  async submit() {
    if(this.form1.valid){
      if(this.task) this.updateTask(); //si existe se actualiza
      else this.createTask(); // si no existe se crea
    }
  }
  
  async createTask() {
    let path = `users/${this.user.uid}/tareas`;

    const loading = await this.utilsService.loading();
    await loading.present();
    this.task = {
      
    id: this.firebaseService.createIdDoc(),
    title: this.form1.controls.title.value,
    description: this.form1.controls.description.value,
    all_day: this.form1.controls.all_day.value,
    start_date: this.form1.controls.start_date.value,
    start_time: this.form1.controls.start_time.value,
    end_date: this.form1.controls.end_date.value,
    end_time: this.form1.controls.end_time.value,
    color: this.selectedColor,
    url: this.form1.controls.url.value,
    notes: this.form1.controls.notes.value
    }
    delete this.form1.value.id;

    this.firebaseService.addDocument(path, this.task)
      .then(async (resp) => {
        this.utilsService.dismissModal({ success: true });

        this.utilsService.presentToast({
          message: `Tarea creada exitosamente`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });
      }).catch((error) => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
  }
  
  async updateTask(){
    let path = `users/${this.user.uid}/tareas/${this.task.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    delete this.form1.value.id;

    this.firebaseService.updateDocument(path, this.form1.value)
      .then(async (resp) => {

        this.utilsService.dismissModal({ success: true });

        this.utilsService.presentToast({
          message: `Tarea actualizada exitosamente`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });
      }).catch((error) => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });

  }

}
