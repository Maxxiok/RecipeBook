import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "../../../node_modules/@ngrx/store";
import { AppState } from "../store/app.reducers";
import * as fromAuth from '../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private store:Store<AppState>){}

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        console.log('Intercepted==>',req);
        
        return this.store.select('auth').take(1).switchMap((authState:fromAuth.State)=>{
            const copyReq=req.clone({params: req.params.set('auth',authState.token)});
            return next.handle(copyReq);
        });
        
    }

}