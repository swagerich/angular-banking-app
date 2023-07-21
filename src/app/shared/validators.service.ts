import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private snackBar = inject(MatSnackBar);

  public isValidField = (myForm: FormGroup, field: string): boolean | null => {
    return myForm.controls[field].errors && myForm.controls[field].touched;
  };

  /* MOSTRAR SNACKBAR MATERIAL  */
  validateSnackBar(error: string): void {
    this.snackBar.open(error, 'done', {
      duration: 3000,
    });
  }

   /* VALIDACIONES PATTERN */
   public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

   public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
}
