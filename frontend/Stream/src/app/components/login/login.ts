import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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

import { AppSettings } from '../../app.settings';
import { HttpService } from '../../services/http';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrl: './login.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginForm: FormGroup;
  private http = inject(HttpService);

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, remember } = this.loginForm.value;
      this.http.post(AppSettings.LOGIN_URL, { email, password }).subscribe({
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
