import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Big Fat Burger',
            'Майже як в Макдаку :)',
            'https://www.tellusaboutus.com/comments/images/BK-WebComment/BB_WHOPPER-v1.png',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        ),
        new Recipe(
            'Tropical fruits',
            'Літо, море, сонце, пляж...',
            'http://www.fashion-pristine.com/wp-content/uploads/feature-image-e1430996518470.jpg',
            [
                new Ingredient('Strawberries', 8),
                new Ingredient('Kiwi', 2),
                new Ingredient('Coconut', 1)
            ]
        ),
        new Recipe(
            'Greek salad',
            'Nice picture',
            'http://vidpoviday.com/wp-content/uploads/2016/04/a2d55e326c2b8485170584c7e3eaf1b7.jpg',
            [
                new Ingredient('Cheese', 120),
                new Ingredient('Olives', 25),
                new Ingredient('Paprika', 1)
            ]
        ),
        new Recipe(
            'Baked fish',
            'Baked Golden fish :)',
            'http://dovidkam.com/wp-content/uploads/2016/08/25e7feea1400930ee0dddd8e8f99b352.jpg',
            [
                new Ingredient('Zander', 1),
                new Ingredient('Lemon', 1),
                new Ingredient('Cucumber', 1)
            ]
        ),
        new Recipe(
            'Tasty Schnitzel',
            'A super tasty Schnitzel - just awesome!',
            'https://media-cdn.tripadvisor.com/media/photo-s/0a/a2/65/f6/babilonia.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            'Налисники від Миколи',
            'Смакота - здуріти можна!!!',
            'http://shostkasyr.com/images/receipts/sdfsdfasdf.jpg',
            [
                new Ingredient('Яловичина', 1000),
                new Ingredient('Гриби', 1500),
                new Ingredient('Молоко', 1000),
                new Ingredient('Мука', 400),
                new Ingredient('Яйця', 5)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(): Recipe[] {
        // using slice() method for returning a copy of array
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
