import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';

import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerForm: FormGroup;
  private http = inject(HttpClient);

  hide = signal(true);

  clickEvent() {
    this.hide.set(!this.hide());
  }

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: [this.validateSamePassword] } as AbstractControlOptions
    );
  }

  private validateSamePassword(group: AbstractControl) {
    const password = group.get('password');
    const repeatPassword = group.get('repeatPassword');
    if (password?.value == repeatPassword?.value) {
      repeatPassword?.setErrors(null);
    } else {
      repeatPassword?.setErrors({ notSame: true });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password, repeatPassword } =
        this.registerForm.value;
      this.http
        .post(
          AppSettings.REGISTER_URL,
          {
            username,
            email,
            password,
            repeatPassword,
          },
          { withCredentials: true, responseType: 'text' }
        )
        .subscribe({
          next: (response) => {
            this.toastr.success(response);
          },
          error: (error) => {
            this.toastr.error(error.error);
          },
        });
    }
  }
}
