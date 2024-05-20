import { Component, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';
import { eachDayOfInterval, format } from 'date-fns';
import { HighlightedDate, colorMessages } from 'src/app/models/tasks.model';
import { TasksFilterComponent } from 'src/app/shared/components/tasks-filter/tasks-filter.component';
import { Tasks } from 'src/app/models/tasks.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);
  loading: boolean = false;
  tasks: Tasks[] = [];

  highlightedDates: any[] = [
    // ENERO
    {
      date: '2024-01-22',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#3BF62C',
    },
    {
      date: '2024-01-23',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#3BF62C',
    },
    {
      date: '2024-01-24',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#3BF62C',
    },
    {
      date: '2024-01-29',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#14830B',
    },

    // FEBRERO
    {
      date: '2024-02-01',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#EF1919',
    },
    {
      date: '2024-02-02',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#EF1919',
    },
    {
      date: '2024-02-05',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#8B8585',
    },
    {
      date: '2024-02-09',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#780C0C',
    },
    
    // MARZO
    {
      date: '2024-03-18',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#8B8585',
    },
    {
      date: '2024-03-25',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-03-26',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-03-27',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-03-28',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-03-29',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },

    // ABRIL
    {
      date: '2024-04-01',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-04-02',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-04-03',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-04-04',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-04-05',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#0D0C0C',
    },
    {
      date: '2024-04-19',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#FFC300',
    },

    // MAYO
    {
      date: '2024-05-01',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#8B8585',
    },
    {
      date: '2024-05-15',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#8B8585',
    },
    {
      date: '2024-05-31',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#900C3F',
    },

    // JUNIO
    {
      date: '2024-06-24',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#EE5916',
    },
    {
      date: '2024-06-25',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#EE5916',
    },
    {
      date: '2024-06-26',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#EE5916',
    },
    {
      date: '2024-06-27',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#EE5916',
    },
    {
      date: '2024-06-28',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: '#EE5916',
    },
  ];

  constructor( private alertController: AlertController, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.initializeTasks();
  }

  ionViewWillEnter(){
    this.initializeTasks();
  }

  async initializeTasks() {
    this.utilsService.afAuth.authState.subscribe(user => {
      if (user) {
        this.firebaseService.getUserTasks(user.uid).subscribe(tasks => {
          const firebaseDates: HighlightedDate[] = tasks.flatMap(task => {
            const start = new Date(task.start_date);
            const end = task.end_date ? new Date(task.end_date) : null;

            start.setMinutes(start.getMinutes() + start.getTimezoneOffset());
            if (end) {
              end.setMinutes(end.getMinutes() + end.getTimezoneOffset());
            }

            const dates = eachDayOfInterval({ start, end }).map(date => ({
              date: format(date, 'yyyy-MM-dd'),
              textColor: 'var(--ion-color-secondary-contrast)',
              backgroundColor: task.color,
              isFirebase: true // Marcar las fechas de Firebase
            }));
            return dates;
          });

          // Filtrar las fechas de Firebase antiguas y combinarlas con las fechas estáticas
          const staticDates = this.highlightedDates.filter(date => !date.isFirebase);
          this.highlightedDates = [
            ...staticDates,
            ...firebaseDates
          ];
        });
      }
    });
  }

  async onDateChange(event: any) {
    const selectedDate = event.detail.value.split('T')[0];
    const highlightedDate = this.highlightedDates.find(
      (highlightedDate) => highlightedDate.date === selectedDate
    );
  
    if (highlightedDate) {
      if (highlightedDate.isFirebase) { //Si la fecha seleccionada es una fecha proveniente de Firebase, se ejecutará el método showTaskFilter
        await this.showTaskFilter(selectedDate);
      } else {
        const message = colorMessages[highlightedDate.backgroundColor] || `Has seleccionado una fecha destacada: ${selectedDate}`;
        const alert = await this.alertController.create({
          header: 'Fecha Destacada',
          message: message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.initializeTasks(); // Actualiza las tareas
      event.target.complete();
    }, 1000); // Espera un segundo antes de completar el evento de actualización
  }

  async showTaskFilter(selectedDate: string){//mostrar tareas    
    let modal = await this.utilsService.getModal({
      component: TasksFilterComponent,
      cssClass: 'add-update-modal',
      componentProps: { 
        selectedDate
       }
    });
  }

}
