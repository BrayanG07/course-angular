import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor() {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value.split(' ').join('').toLowerCase();

    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      console.log({ email });

      if (email === 'brayan.alvarez@gmail.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete(); // * complete = hace la limpieza y tambien se desuscribe, y deja de ejecutar las siguientes lineas.
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(3000) // * Para simular que es una peticion HTTP :-)
    )

    return httpCallObservable;
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
