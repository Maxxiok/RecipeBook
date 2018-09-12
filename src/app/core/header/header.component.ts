import { Component, OnInit} from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from '../../../../node_modules/rxjs';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{

  authState: Observable<fromAuth.State>;

  constructor(private dataStore:DataStorageService, private authService:AuthService, private store:Store<fromApp.AppState>){}

  ngOnInit(){
    this.authState=this.store.select('auth');
  }

  onSaveData(){
    this.dataStore.storeRecipes().subscribe(
      (data)=>{
        console.log(data);
    });
  }

  onFetchData(){
    this.dataStore.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }

}
