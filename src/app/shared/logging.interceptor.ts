import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators';


export class LoggingInterceptor implements HttpInterceptor{

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(req).pipe(tap(
            event=>{
               console.log('Response intercepted==>',event); 
            }
        ));
    }

}