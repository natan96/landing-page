import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  submitting = false;

  constructor(
    private _auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    const emailState = window.history.state?.email
    if (emailState) {
      this.f['email'].setValue(emailState);
    }
  }

  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.submitting = true;
    try {
      const { email, password } = this.formGroup.value;
      if (await this._auth.login(email, password)) {
        this.router.navigate(['/home']);
        return;
      } else {
        this.toastr.warning('E-mail ou senha inválidos');
      }
    } catch (error) {
      this.toastr.error('Erro ao efetuar login, contate o desenvolvedor');
    }
    this.submitting = false;
  }

  get f() {
    return this.formGroup.controls;
  }
}
