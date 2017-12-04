import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') shoppingListForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        console.log(this.shoppingListForm);
        this.subscription = this.shoppingListService.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem = this.shoppingListService.getIngredient(index);
                    this.shoppingListForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    });
                }
            );
    }

    onSubmit(form: NgForm): void {
        const newIngredient = new Ingredient(form.value.name, form.value.amount);
        if (this.editMode) {
            this.shoppingListService
                .updateIngredient(this.editedItemIndex, newIngredient);
        } else {
            this.shoppingListService.addIngredient(newIngredient);
        }
        this.onClear();
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    onClear() {
        this.editMode = false;
        this.shoppingListForm.reset();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
