import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode=false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.editMode=params['id']!=null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName='';
    let recipeImgPath='';
    let recipeDescr='';
    let ingredients=new FormArray([]);

    if(this.editMode){
      recipeName=this.recipeService.getRecipe(this.id).name;
      recipeImgPath=this.recipeService.getRecipe(this.id).imagePath;
      recipeDescr=this.recipeService.getRecipe(this.id).description;
      if(this.recipeService.getRecipe(this.id).ingredients.length>0){
        for(let ingr of this.recipeService.getRecipe(this.id).ingredients) {
          ingredients.push(new FormGroup({
            'name':new FormControl(ingr.name,Validators.required),
            'amount':new FormControl(ingr.amount,[Validators.required,Validators.pattern(/^[0-9]+[0.9]*$/)])
          }));
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imgPath':new FormControl(recipeImgPath,Validators.required),
      'description':new FormControl(recipeDescr,Validators.required),
      'ingredients':ingredients
    });
  }

  onSubmit(){
    const recipe =new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imgPath'],this.recipeForm.value['ingredients']);
    if(this.editMode)
      this.recipeService.updateRecipe(this.id,recipe);
    else
      this.recipeService.addRecipe(recipe);
    this.router.navigate(['../'],{relativeTo:this.route});
    
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+[0.9]*$/)])
    }));
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
