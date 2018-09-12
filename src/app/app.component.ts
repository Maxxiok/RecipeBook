import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBsalcuuN1w3BMP5BYtR5FuzDeyInpJUWw",
      authDomain: "recipe-app-7a633.firebaseapp.com",
      databaseURL: "https://recipe-app-7a633.firebaseio.com",
      projectId: "recipe-app-7a633",
      storageBucket: "recipe-app-7a633.appspot.com",
      messagingSenderId: "276919797495"
    });
  }

}
