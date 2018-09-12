import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';


@Injectable()
export class AuthService{

    constructor(private router:Router, private store: Store<AppState>){}

    signUpUser(email:string, pwd:string){
        firebase.auth().createUserWithEmailAndPassword(email,pwd)
        .then(
            user=>{
                this.store.dispatch(new AuthActions.Signup());
                firebase.auth().currentUser.getIdToken().then(
                    token=>this.store.dispatch(new AuthActions.SetToken(token))
                );
            }
        )
        .catch(
            error=>console.log(error)
        );
    }

    singInUser(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            response=>{
                this.store.dispatch(new AuthActions.Signin());
                firebase.auth().currentUser.getIdToken().then(
                    token=>this.store.dispatch(new AuthActions.SetToken(token))
                );
                this.router.navigate(['/']);
            })
            .catch(error=>console.log(error));
    }

    logout(){
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/']);
    }
}