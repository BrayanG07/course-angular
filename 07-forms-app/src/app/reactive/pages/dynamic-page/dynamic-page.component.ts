import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  public productForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Call of duty', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productForm.reset();
    // * Eliminando y/o Limpiando los inputs cuando el usuario presiona en guardar
    (this.productForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([])
  }

  get favoriteGames(): FormArray {
    return this.productForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.productForm.controls[field].errors &&
      this.productForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.productForm.controls[field]) return null;

    const errors = this.productForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        default:
          break;
      }
    }

    return null;
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  onDeleteFavoriteGame(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavoriteGame(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // * Insertar opcion #1
    // this.favoriteGames.push(new FormControl(newGame, Validators.required));

    // * Insertar opcion #2 (Recomendada)
    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }
}
