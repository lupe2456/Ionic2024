import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {

  selectedDates: string[] = ['2024-01-01','2024-01-02'];
  highlightedDates = [
    {
      date: '2024-01-01',
      textColor: '#8000000',
      backgroundColor: '#ffc0cb',
    },
    {
      date: '2024-01-06',
      textColor: '#8000000',
      backgroundColor: '#ffc0cb',
    },
    {
      date: '2024-01-17',
      textColor: '#8000000',
      backgroundColor: '#ffc0cb',
    },
    {
      date: '2024-01-22',
      textColor: '#8000000',
      backgroundColor: '#ffc0cb',
    }
  ];

  constructor() {}

  ngOnInit() {}
}
