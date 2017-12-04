import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Juice', 2),
        new Ingredient('Bread', 1),
        new Ingredient('Oranges', 4),
        new Ingredient('Butter', 200),
        new Ingredient('Salt', 1)
    ];

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    getIngredients(): Ingredient[] {
        // using slice() method for returning a copy of array
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // adding an array of ingredients with a new push() method syntax
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
