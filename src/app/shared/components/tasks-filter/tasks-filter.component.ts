import { Component, Input, OnInit, inject } from '@angular/core';
import { Tasks } from 'src/app/models/tasks.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';

@Component({
  selector: 'app-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss'],
})
export class TasksFilterComponent  implements OnInit {

  @Input() selectedDate: string; // Recibe la fecha seleccionada
  
  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);
  loading: boolean = false;
  tasks: Tasks[] = [];
  
  constructor() { }

  ngOnInit() {
    this.getTasksForDate(this.selectedDate);    
  }


  user(): User{
    return this.utilsService.getLocalStorage('user');
  }

  getTasksForDate(date: string) {
    let path = `users/${this.user().uid}/tareas`;

    this.loading = true;

    let sub = this.firebaseService.getCollectionChanges(path)
      .subscribe({
        next: (resp: any) => {
          this.tasks = resp.filter((task: Tasks) => task.start_date === date || (task.end_date && this.isDateInRange(date, task.start_date, task.end_date)));
          
          this.loading = false; // Para que deje de cargar
          sub.unsubscribe();
        }
      });
  }

  isDateInRange(date: string, startDate: string, endDate: string): boolean {
    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return d >= start && d <= end;
  }

}
