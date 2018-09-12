import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '../../../../node_modules/@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { TrySignup } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
  }

  onSignUp(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.store.dispatch(new TrySignup({username:email, password:password}));
  }

}
