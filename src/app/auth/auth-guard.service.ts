import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Store } from "../../../node_modules/@ngrx/store";
import { AppState } from "../store/app.reducers";
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private store:Store<AppState>,private router:Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean>|boolean{
        let auth:boolean;
        this.store.select('auth').map((authState:fromAuth.State)=>{
            auth=authState.authenticated;
        })
        if(auth)
            return true;
        else
            this.router.navigate(['/']);
    }

}