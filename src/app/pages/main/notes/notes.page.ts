import { Component, OnInit, inject } from '@angular/core';
import { Notes } from 'src/app/models/tasks.model';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  newNote: string = '';
  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);
  notes: Notes[] = [];
  loading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getNotes();
    
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
  }

  async createNote() {
    if (this.newNote.trim() !== '') {
      const id_doc = this.firebaseService.createIdDoc();
      const path = `users/${this.user().uid}/notas`;
  
      const loading = await this.utilsService.loading();
      await loading.present();
  
      this.firebaseService
        .addDocument(path, id_doc, { content: this.newNote }) // Aquí pasamos la nueva nota como un objeto
        .then(async (resp) => {
          this.newNote = ''; // Limpiar el campo de nueva nota después de agregarla
          this.utilsService.dismissModal({ success: true });
  
          this.utilsService.presentToast({
            message: `Nota creada exitosamente`,
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
  }
  

  // async updateTask() {
  //   let path = `users/${this.user.uid}/tareas/${this.task.id}`;

  //   const loading = await this.utilsService.loading();
  //   await loading.present();

  //   delete this.form1.value.id;

  //   this.firebaseService
  //     .updateDocument(path, this.form1.value)
  //     .then(async (resp) => {
  //       this.utilsService.dismissModal({ success: true });

  //       this.utilsService.presentToast({
  //         message: `Tarea actualizada exitosamente`,
  //         duration: 1500,
  //         color: 'primary',
  //         position: 'bottom',
  //         icon: 'checkmark-circle-outline',
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.utilsService.presentToast({
  //         message: error.message,
  //         duration: 2500,
  //         color: 'danger',
  //         position: 'bottom',
  //         icon: 'alert-circle-outline',
  //       });
  //     })
  //     .finally(() => {
  //       loading.dismiss();
  //     });
  // }

  // async deleteNote(note: Notes) { // Cambiamos el tipo de argumento a Notes
  //   const path = `users/${this.user().uid}/notas/${note.id}`;
  
  //   const loading = await this.utilsService.loading();
  //   await loading.present();
  
  //   this.firebaseService.deleteDocument(path)
  //     .then(async (resp) => {
  //       // Eliminamos la nota del array de notas
  //       this.notes = this.notes.filter(e => e.id !== note.id);
  
  //       this.utilsService.dismissModal({ success: true });
  
  //       this.utilsService.presentToast({
  //         message: `Nota eliminada exitosamente`,
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
  

  getNotes() {
    const path = `users/${this.user().uid}/notas`;
        
    this.loading = true;
  
    const sub = this.firebaseService.getCollectionChanges(path)
      .subscribe({
        next: (resp: any[]) => {
          console.log("Notas recibidas:", resp); // Verifica los datos recibidos desde Firestore
          this.notes = resp;
          this.loading = false;
          sub.unsubscribe();
        },
        error: (err) => {
          console.error("Error al obtener notas:", err); // Registra cualquier error que ocurra
          this.loading = false;
        }
      });
  }

  
}
