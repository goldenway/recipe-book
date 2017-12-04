import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
    ngOnInit() {
        //init Firebase
        firebase.initializeApp({
            apiKey: "AIzaSyA9Zbm7xEejqbI6Hc2Vt4CG9KMmQrW9p4Q",
            authDomain: "gw-recipe-book.firebaseapp.com"
        });
    }
}
