import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    private snack : MatSnackBar) { }

  success(msg : string): void {
    this.snack.open(msg, 'ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 6000,
      panelClass: ['success-snack']
    })
  }

  error(msg: string): void {
    this.snack.open(msg, 'ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 6000,
      panelClass: ['error-snack']
    })
  }
}