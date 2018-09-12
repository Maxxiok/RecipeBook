import {Effect, Actions} from '@ngrx/effects';
import { Injectable } from '../../../../node_modules/@angular/core';
import { TRY_SIGNUP } from './auth.actions';

@Injectable()
export class AuthEffects{
    @Effect()
    authSignup=this.actions$.ofType(TRY_SIGNUP);

    constructor(private actions$:Actions){}
}