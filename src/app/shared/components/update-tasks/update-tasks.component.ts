import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employees, Tasks } from 'src/app/models/tasks.model';

import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';


import { Router } from '@angular/router';// esto es de mi vista TASKS

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {

// esto es de mi vista TASKS -----------------------------------------------------------------------------------
  // Variable para almacenar el color seleccionado
  selectedColor: string = 'null';

  // Función para seleccionar un color
  selectColor(color: string) {
    this.selectedColor = color;
    console.log('Color seleccionado:', color);
  }

  constructor(private router: Router) { }

  agregarTarea() {
    // Aquí puedes implementar la lógica para verificar los campos
    // por ejemplo: validar que el título, la fecha de inicio y fin y el color estén definidos
    // Si todo está bien, puedes agregar la tarea
    // Si algo está mal, puedes mostrar un mensaje de error o realizar alguna otra acción
    // Por ahora, simplemente redirigiré al usuario a la página home

    this.router.navigate(['/main/home']);
  }
// esto es de mi vista TASKS -----------------------------------------------------------------------------------




  @Input() task: Tasks;// add
  @Input() employee: Employees;

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;

  
  form1 = new FormGroup( {// solo "form" add
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    all_day: new FormControl(''),
    start_date: new FormControl(''), //, [Validators.required]
    start_time: new FormControl(''),
    end_date: new FormControl(''),
    end_time: new FormControl(''),
    color: new FormControl(''),//, [Validators.required]
    url: new FormControl(''),
    notes: new FormControl('')
  });

  // form = new FormGroup({
  //   id: new FormControl(''),
  //   name: new FormControl('', [Validators.required]),
  //   img: new FormControl('', [Validators.required]),
  //   salario: new FormControl(null, [Validators.required, Validators.min(0)]),
  //   cargo: new FormControl('', [Validators.required]),
  //   plantel: new FormControl('', [Validators.required]),
  // });

  ngOnInit() {
    // this.user = this.utilsService.getLocalStorage('user');
    // if(this.employee) this.form.setValue(this.employee);

    //add
    this.user = this.utilsService.getLocalStorage('user');
    if(this.task) this.form1.setValue(this.task);
  }

  // setNumberInput(){ // convierte un input a numérico en firestore
  //   let { salario } = this.form.controls;
  //   if(salario.value) salario.setValue(parseFloat(salario.value));
  // }

  //add
  setDateInput(){ // convierte un input a fecha en firestore
    let { start_date } = this.form1.controls; //solo form
    let { end_date } = this.form1.controls; //solo form

    if (start_date.value) {
      const fecha = new Date(start_date.value);// Crea un objeto de fecha a partir del string
      const fechaISO = fecha.toISOString();// Convierte el objeto de fecha a un string en formato ISO
      start_date.setValue(fechaISO);
    }

    if (end_date.value) {
      const fecha = new Date(end_date.value);
      const fechaISO = fecha.toISOString();
      end_date.setValue(fechaISO);
    }

  }

   //add
   setTimeInput(){ // convierte un input a hora en firestore
    let { start_time } = this.form1.controls; //solo form
    let { end_time } = this.form1.controls; //solo form

    if (start_time.value) {
      const time = new Date(start_time.value);// Crea un objeto de fecha a partir del string
      const timeISO = time.toISOString();// Convierte el objeto de fecha a un string en formato ISO 8601
      start_time.setValue(timeISO);// Establece el valor del campo como la cadena de tiempo en formato ISO 8601
    }

    if (end_time.value) {
      const time = new Date(end_time.value);// Crea un objeto de fecha a partir del string
      const timeISO = time.toISOString();// Convierte el objeto de fecha a un string en formato ISO 8601
      end_time.setValue(timeISO);
    }
  }

  async submit() {
    // if(this.form.valid){
    //   if(this.employee) this.updateEmployee(); //si existe se actualiza
    //   else this.createEmployee(); // si no existe se crea
    // }

    //add
    if(this.form1.valid){//solo form
      if(this.task) this.updateTask(); //si existe se actualiza
      else this.createTask(); // si no existe se crea
    }
  }

  // async createEmployee() {
  //   let path = `users/${this.user.uid}/empleados`;

  //   const loading = await this.utilsService.loading();
  //   await loading.present();

  //   let dataUrl = this.form.value.img;
  //   let imgPath = `${this.user.uid}/${Date.now()}`;
  //   let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);

  //   this.form.controls.img.setValue(imgUrl);

  //   delete this.form.value.id;

  //   this.firebaseService.addDocument(path, this.form.value)
  //     .then(async (resp) => {
  //       this.utilsService.dismissModal({ success: true });

  //       this.utilsService.presentToast({
  //         message: `Empleado creado exitosamente`,
  //         duration: 1500,
  //         color: 'primary',
  //         position: 'bottom',
  //         icon: 'checkmark-circle-outline',
  //       });
  //     }).catch((error) => {
  //       console.log(error);
  //       this.utilsService.presentToast({
  //         message: error.message,
  //         duration: 2500,
  //         color: 'danger',
  //         position: 'bottom',
  //         icon: 'alert-circle-outline',
  //       });
  //     }).finally(() => {
  //       loading.dismiss();
  //     });
  // }

  
  async createTask() { //add
    let path = `users/${this.user.uid}/tareas`;

    const loading = await this.utilsService.loading();
    await loading.present();

    // let dataUrl = this.form1.value.img;//solo form
    // let imgPath = `${this.user.uid}/${Date.now()}`;
    // let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);

    // this.form.controls.img.setValue(imgUrl);

    delete this.form1.value.id;// solo form

    this.firebaseService.addDocument(path, this.form1.value)// solo form
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

  // async updateEmployee(){
  //   let path = `users/${this.user.uid}/empleados/${this.employee.id}`;

  //   const loading = await this.utilsService.loading();
  //   await loading.present();

  //   if(this.form.value.img !== this.employee.img ){
  //     let dataUrl = this.form.value.img;
  //     let imgPath = await this.firebaseService.getFilePath(this.employee.img);
  //     let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);

  //     this.form.controls.img.setValue(imgUrl);
  //   }

  //   delete this.form.value.id;

  //   this.firebaseService.updateDocument(path, this.form.value)
  //     .then(async (resp) => {

  //       this.utilsService.dismissModal({ success: true });

  //       this.utilsService.presentToast({
  //         message: `Empleado actualizado exitosamente`,
  //         duration: 1500,
  //         color: 'primary',
  //         position: 'bottom',
  //         icon: 'checkmark-circle-outline',
  //       });
  //     }).catch((error) => {
  //       console.log(error);
  //       this.utilsService.presentToast({
  //         message: error.message,
  //         duration: 2500,
  //         color: 'danger',
  //         position: 'bottom',
  //         icon: 'alert-circle-outline',
  //       });
  //     }).finally(() => {
  //       loading.dismiss();
  //     });

  // }

  
  async updateTask(){//add
    let path = `users/${this.user.uid}/tareas/${this.task.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    // if(this.form1.value.img !== this.task.img ){//solo form
    //   let dataUrl = this.form.value.img;
    //   let imgPath = await this.firebaseService.getFilePath(this.task.img);
    //   let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);

    //   this.form.controls.img.setValue(imgUrl);
    // }

    delete this.form1.value.id;//solo form

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

  // async takeImage() {
  //   const dataUrl = (await this.utilsService.takePicture('Imagen del empleado')).dataUrl; // Extraer la respuesta
  //   this.form.controls.img.setValue(dataUrl);
  // }
}
