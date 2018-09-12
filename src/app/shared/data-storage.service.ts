import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import 'rxjs/Rx';
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";


@Injectable()
export class DataStorageService{

    constructor(private httpClient:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){

        /* return this.httpClient.put('https://recipe-app-7a633.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            observe: 'body',
            params: new HttpParams().set('auth', token)
            //headers: new HttpHeaders().set('Authorization','example token').append('Additiona','more info')
        }); */

        const req= new HttpRequest('PUT', 'https://recipe-app-7a633.firebaseio.com/recipes.json', this.recipeService.getRecipes(),{
            reportProgress: true,
            //params: new HttpParams().set('auth', token)
        })
        return this.httpClient.request(req);
    }

    getRecipes(){

       // return this.httpClient.get<Recipe[]>('https://recipe-app-7a633.firebaseio.com/recipes.json?auth='+token).map(
        return this.httpClient.get<Recipe[]>('https://recipe-app-7a633.firebaseio.com/recipes.json',{
                observe: 'body',
                responseType: 'json'
            })
            .map(
           (recipes)=>{
                for (let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients']=[];
                    }
                }
                return recipes;  
            } 
        ).subscribe(
            (recipes:Recipe[])=>{
                this.recipeService.setRecipes(recipes);
            }
        );
    }


}