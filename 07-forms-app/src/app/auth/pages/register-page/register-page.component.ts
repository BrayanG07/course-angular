import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsService.firstNameAndLastnamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
        // [new EmailValidatorService()] // ? OPCION 1 Validaciones Async
        // ? OPCION 2 Validaciones Async
        [this.emailValidatorService],
      ],
      username: [
        '',
        [Validators.required, this.validatorsService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: [
        // * Esta funcion implicitamente adquiere el formGroup en cuestion
        this.validatorsService.isFieldOneEqualFieldTwo(
          'password',
          'passwordConfirm'
        ),
      ],
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) {}

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(field, this.myForm);
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }
}
