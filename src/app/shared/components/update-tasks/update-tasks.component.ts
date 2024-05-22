import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tasks } from 'src/app/models/tasks.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.scss'],
})
export class UpdateTaskComponent implements OnInit {
  selectedColor: string = ''; // Variable para almacenar el color seleccionado

  // Función para seleccionar un color
  selectColor(color: string) {
    this.selectedColor = color;
    this.form1.controls.color.setValue(color);
  }

  constructor() {}

  @Input() task: Tasks;

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;

  form1 = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    all_day: new FormControl('false'),
    start_date: new FormControl('', [Validators.required]),
    start_time: new FormControl(''),
    end_date: new FormControl(''),
    end_time: new FormControl(''),
    color: new FormControl('', [Validators.required]),
    url: new FormControl(''),
    notes: new FormControl(''),
  });

  ngOnInit() {
    this.initializeSelectedColor();
    this.user = this.utilsService.getLocalStorage('user');

    if (this.task) {
      this.form1.controls.id.setValue(this.task.id);
      this.form1.controls.title.setValue(this.task.title);
      this.form1.controls.description.setValue(this.task.description);
      this.form1.controls.all_day.setValue(this.task.all_day);
      this.form1.controls.start_date.setValue(this.task.start_date);
      this.form1.controls.start_time.setValue(this.task.start_time);
      this.form1.controls.end_date.setValue(this.task.end_date);
      this.form1.controls.end_time.setValue(this.task.end_time);
      this.form1.controls.color.setValue(this.task.color);
      this.form1.controls.url.setValue(this.task.url);
      this.form1.controls.notes.setValue(this.task.notes);
    }
  }

  async submit() {
    if (this.form1.valid) {
      if (this.task) this.updateTask(); //si existe se actualiza
      else this.createTask(); // si no existe se crea
    }
  }

  initTask() {
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
      notes: this.form1.controls.notes.value,
    };
  }

  async createTask() {
    const id_doc = this.firebaseService.createIdDoc();

    let path = `users/${this.user.uid}/tareas`;

    const loading = await this.utilsService.loading();
    await loading.present();

    this.task = {
      id: id_doc,
      title: this.form1.controls.title.value,
      description: this.form1.controls.description.value,
      all_day: this.form1.controls.all_day.value,
      start_date: this.form1.controls.start_date.value,
      start_time: this.form1.controls.start_time.value,
      end_date: this.form1.controls.end_date.value,
      end_time: this.form1.controls.end_time.value,
      color: this.selectedColor,
      url: this.form1.controls.url.value,
      notes: this.form1.controls.notes.value,
    };

    delete this.form1.value.id;

    this.firebaseService
      .addDocument(path, id_doc, this.task)
      .then(async (resp) => {
        this.utilsService.dismissModal({ success: true });

        this.utilsService.presentToast({
          message: `Tarea creada exitosamente`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });
      })
      .catch((error) => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => {
        loading.dismiss();
      });
  }

  async updateTask() {
    let path = `users/${this.user.uid}/tareas/${this.task.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    delete this.form1.value.id;

    this.firebaseService
      .updateDocument(path, this.form1.value)
      .then(async (resp) => {
        this.utilsService.dismissModal({ success: true });

        this.utilsService.presentToast({
          message: `Tarea actualizada exitosamente`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });
      })
      .catch((error) => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => {
        loading.dismiss();
      });
  }

  // Método para ajustar automáticamente las horas cuando se marca/desmarca "Todo el día"
  toggleAllDay() {
    if (this.form1.controls.all_day.value) {
      // Si se marca el checkbox all_day, establecer los valores predeterminados para la fecha y la hora
      const selectedStartDate = this.form1.controls.start_date.value;
      const today = selectedStartDate
        ? selectedStartDate
        : new Date().toISOString().split('T')[0];
      this.form1.patchValue({
        start_date: today,
        start_time: '00:00',
        end_date: today,
        end_time: '23:59',
      });
    } else {
      // Si se desmarca el checkbox all_day, limpiar los valores de fecha y hora
      this.form1.patchValue({
        start_time: null,
        end_date: null,
        end_time: null,
      });
    }
  }

  // Función para inicializar el color seleccionado
  initializeSelectedColor() {
    // Verifica si hay un color definido en la tarea y establece selectedColor en ese valor si existe
    if (this.task && this.task.color) {
      this.selectedColor = this.task.color;
    }
  }

  getColorDescription(color: string): string {
    // Definir la descripción para cada color
    switch (color) {
      case '#2ecc71':
        return 'Reunión';

      case '#ff9f43':
        return 'Exámenes';

      case '#9b59b6':
        return 'Entregas finales';

      case '#f1c40f':
        return 'Suspensión';

      case '#ff6b81':
        return 'Visitas industriales';

      case '#00b894':
        return 'Eventos deportivos';

      default:
        return '';
    }
  }
}
