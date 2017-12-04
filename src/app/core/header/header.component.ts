import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(
        private dataStorageService: DataStorageService,
        private router: Router,
        public authService: AuthService
    ) {}

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response: Response) => console.log(response),
                (error) => console.log(error)
            );
    }

    onGetData() {
        this.dataStorageService.getRecipes();
        this.router.navigate(['/recipes']);
    }

    onLogout() {
        this.authService.logout();
    }
}
