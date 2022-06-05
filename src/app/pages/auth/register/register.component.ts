import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UserRepository } from 'src/app/core/repositories/user.repository';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  data = new User();
  submitted = false;
  submitting = false;

  invalidPasswords = false;
  usedEmail = false;
  usedCrm = false;

  constructor(
    private _user: UserRepository,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      crm: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.invalidPasswords = this.f['password'].value !== this.f['confirmPassword'].value;
    if (this.invalidPasswords) {
      this.toastr.warning('As senhas não conferem');
      return;
    }

    this.submitting = true;
    try {
      const value = this.formGroup.value;
      delete value.confirmPassword;
      this.usedEmail = await this._user.emailUsed(value.email);
      this.usedCrm = await this._user.crmUsed(value.crm);
      if (this.usedEmail || this.usedCrm) {
        if (this.usedEmail) {
          this.toastr.warning('E-mail já cadastrado! Tente outro');
        }
        if (this.usedCrm) {
          this.toastr.warning('CRM já cadastrado! Tente outro');
        }
      } else {
        Object.assign(this.data, this.formGroup.value);
        const result = await this._user.add(this.data);
        this.toastr.success('Cadastro efetuado com sucesso!');
        this.router.navigate(['/auth/login'], { state: { email: result.email } });
        return;
      }
    } catch (error) {
      this.toastr.error('Erro ao efetuar o cadastro, contate o desenvolvedor');
    }
    this.submitting = false;
  }

  get f() {
    return this.formGroup.controls;
  }

}
