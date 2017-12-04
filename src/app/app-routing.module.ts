import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    // lazy loading for 'recipes' section
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    // preloading lazy loaded routes with preloadingStrategy property:
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
