import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarContentComponent } from './snack-bar-content/snack-bar-content.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private _snackBar: MatSnackBar) { }

    public showLoadingSnackbar() {
        this._snackBar.openFromComponent(SnackBarContentComponent);
    }

    public hideLoadingSnackbar() {
        this._snackBar.dismiss();
    }
}
