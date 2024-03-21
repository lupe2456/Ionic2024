// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-ejercicios',
//   templateUrl: './ejercicios.page.html',
//   styleUrls: ['./ejercicios.page.scss'],
// })
// export class EjerciciosPage implements OnInit {

//   selectedDates: string[] = ['2024-01-01','2024-01-02'];
//   highlightedDates = [
//     {
//       date: '2024-01-01',
//       textColor: '#8000000',
//       backgroundColor: '#ffc0cb',
//     },
//     {
//       date: '2024-01-06',
//       textColor: '#8000000',
//       backgroundColor: '#ffc0cb',
//     },
//     {
//       date: '2024-01-17',
//       textColor: '#8000000',
//       backgroundColor: '#ffc0cb',
//     },
//     {
//       date: '2024-01-22',
//       textColor: '#8000000',
//       backgroundColor: '#ffc0cb',
//     }
//   ];

//   constructor() {}

//   ngOnInit() {}
// }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  // selectedDates: string[] = ['2024-01-01','2024-01-02'];

  highlightedDates: any[] = [];
  selectedDate: string;

  highlightedDates2 = [
    {
      date: '2024-03-10',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    },
    {
      date: '2024-03-11',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    },
    {
      date: '2024-03-12',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    },
    {
      date: '2024-03-29',
      textColor: '#00FF00',
      backgroundcolor: '#FFFFFF',
      // box-shadow:'',
      // border:'0 12px 0 0',
    },
    {
      date: '2024-03-30',
      textColor: '#00FF00',
      backgroundcolor: '#FFFFFF',
    },
  ];

  highlightedDates1 = [
    {
      date: '2024-03-29',
      textColor: '#00FF00',
      backgroundcolor: '#FFFFFF',
      // border:'12px solid #000000',
    },
    {
      date: '2024-03-30',
      textColor: '#00FF00',
      backgroundcolor: '#FFFFFF',
    },
  ];

  constructor() {
    this.selectedDate = new Date().toISOString(); // Inicializar con la fecha actual
  }

  ngOnInit() {}

  onDateChange(event: any) {
    const selectedDate = event.detail.value.split('T')[0];

    const index = this.highlightedDates.findIndex(
      (d) => d.date === selectedDate
    );
    if (index === -1) {
      this.highlightedDates.push({
        date: selectedDate,
        textColor: 'var(--ion-color-secondary-contrast)',
        backgroundColor: 'var(--ion-color-secondary)',
      });
      alert('Fecha agregada');
    } else {
      this.highlightedDates.splice(index, 1);
      alert('Fecha removida');
    }
  }
}
