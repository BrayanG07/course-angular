import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
import { KR_DASHBOARD } from '../../../constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  public myForm: FormGroup = this.formBuilder.group({
    email: ['brayan.alvarez@correo.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]],
  })

  login(): void {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate([KR_DASHBOARD]),
      error: (err) => Swal.fire('Advertencia', err, 'error'),
    })
  }
}
