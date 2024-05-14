import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { Tasks } from 'src/app/models/tasks.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-tasks/update-tasks.component';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.page.html',
  styleUrls: ['./view-tasks.page.scss'],
})
export class ViewTasksPage implements OnInit {

  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);
  loading: boolean = false;
  tasks: Tasks[] = [];

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.getTask();
    console.log("ENtre: ");
  }


  async addUpdateTask(task?: Tasks){//agregar y editar una tarea
    console.log(task);
    
    let modal = await this.utilsService.getModal({
      component: UpdateEmployeeComponent,// update-task
      cssClass: 'add-update-modal',
      componentProps: { task }
    });

    if(modal) this.getTask(); // si se activa la ventana modal que se recargue la pagina
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
  }

  getTask(){
    let path = `users/${this.user().uid}/tareas`;
    
    this.loading = true;

    let sub = this.firebaseService.getCollectionChanges(path)
    .subscribe({
        next: (resp: any) => {
          console.log(resp);
          
          this.tasks = resp; // muestra los empleados

          this.loading = false; //para que deje de cargar
          sub.unsubscribe();
        }
      })
  }

  doRefresh(event: any){
    setTimeout(() => {
      this.getTask();
      event.target.complete();
    }, 1000); // que después de un segundo lo cargue
  }


  async deleteTask(task: Tasks){
    let path = `users/${this.user().uid}/tareas/${task.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    this.firebaseService.deleteDocument(path)
      .then(async (resp) => {

        //actualizar lista
        this.tasks = this.tasks.filter(e => e.id !== task.id);

        this.utilsService.dismissModal({ success: true });

        this.utilsService.presentToast({
          message: `Tarea eliminada exitosamente`,
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

  async confirmDeleteTask(task: Tasks){
    this.utilsService.presentAlert({
      header: 'Eliminar Tarea',
      message: '¿Desea eliminar la tarea?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteTask(task);
          }
        }
      ]
    })
  }

}
