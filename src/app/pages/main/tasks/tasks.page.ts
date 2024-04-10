import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
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

  ngOnInit() {}
}
