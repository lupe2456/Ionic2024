import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  highlightedDates = [
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

  constructor() {}

  ngOnInit() {}
}
