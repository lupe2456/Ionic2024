import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';
import { User } from 'src/app/models/user.model';
import { Notes } from 'src/app/models/tasks.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);

  notes: Notes[] = [];
  loading: boolean = false;

  form1 = new FormGroup({
    id: new FormControl(''),
    content: new FormControl('', [Validators.required])
  });

  constructor() {}

  @Input() note: Notes;

  ngOnInit() {
    this.getNote();

    if (this.note) {
      this.form1.controls.id.setValue(this.note.id);
      this.form1.controls.content.setValue(this.note.content);
    }
  }

  async submit() {
    if (this.form1.valid) {
       this.createNote(); // si no existe se crea
    }
  }

  ionViewWillEnter() {
    this.getNote();
  }

  user(): User {
    return this.utilsService.getLocalStorage('user');
  }

async createNote() {
  const id_doc = this.firebaseService.createIdDoc();

  let path = `users/${this.user().uid}/notas`;

  const loading = await this.utilsService.loading();
  await loading.present();

  this.note = {
    id: id_doc,
    content: this.form1.controls.content.value,
  };

  delete this.form1.value.id;
  this.form1.reset(); // elimina los datos del form
  
  this.firebaseService
    .addDocument(path, id_doc, this.note)
    .then(async (resp) => {
      this.getNote(); // actualiza las notas después de agregar

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

  doRefresh(event: any) {
    setTimeout(() => {
      this.getNote();
      event.target.complete();
    }, 1000); // que después de un segundo lo cargue
  }

  async deleteNote(note: Notes) {
    let path = `users/${this.user().uid}/notas/${note.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    this.firebaseService
      .deleteDocument(path)
      .then(async (resp) => {
        //actualizar lista
        this.notes = this.notes.filter((e) => e.id !== note.id);

        await this.utilsService.presentToast({
          message: `Nota eliminada exitosamente`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });
      })
      .catch(async (error) => {
        console.log(error);
        await this.utilsService.presentToast({
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

  async confirmDeleteNote(note: Notes) {
    this.utilsService.presentAlert({
      header: 'Eliminar Nota',
      message: '¿Desea eliminar la nota?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteNote(note);
          },
        },
      ],
    });
  }

  getNote() {
    let path = `users/${this.user().uid}/notas`;

    this.loading = true;

    let sub = this.firebaseService.getCollectionChanges(path).subscribe({
      next: (resp: any) => {
        this.notes = resp; // muestra las notas

        this.loading = false; //para que deje de cargar
        sub.unsubscribe();
      },
    });
  }
}
