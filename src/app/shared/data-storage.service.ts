import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(
        private recipeService: RecipeService,
        private http: Http,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const token = this.authService.getToken();
        const recipes = this.recipeService.getRecipes();

        return this.http.put('https://gw-recipe-book.firebaseio.com/recipes.json?auth=' + token, recipes);
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.http.get('https://gw-recipe-book.firebaseio.com/recipes.json?auth=' + token)
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    //check if recipe has the 'ingredients' property
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
