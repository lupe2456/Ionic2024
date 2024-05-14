import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/serivices/firebase.service';
import { UtilsService } from 'src/app/serivices/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  router = inject(Router);
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  currentPath: string = '';

  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline' },
  ];

  constructor() {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    });
    // console.log(this.pages); no se ocupa
  }

  signOut() {
    this.firebaseService.signOut();
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
  }

}
