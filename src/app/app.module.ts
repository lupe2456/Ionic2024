import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { initializeApp } from 'firebase/app';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyDkQuGwJ9aymHVRCYIfumiuxW1mx8MDSZQ',
  authDomain: 'agenda-c2115.firebaseapp.com',
  projectId: 'agenda-c2115',
  storageBucket: 'agenda-c2115.appspot.com',
  messagingSenderId: '1087297644143',
  appId: '1:1087297644143:web:294984952046b557938f9a',
};

initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), // IonicModule.forRoot({mode:'md'}) 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
