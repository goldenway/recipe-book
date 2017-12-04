import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent {
    recipe: Recipe;
    id: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private recipeService: RecipeService
    ) {}

    ngOnInit(): void {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.recipe = this.recipeService.getRecipe(this.id);
                }
            );
    }

    onAddToShoppingList(): void {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe(): void {
        this.router.navigate(['edit'], { relativeTo: this.route });
    }

    onDeleteRecipe(): void {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }
}
