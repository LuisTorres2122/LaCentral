import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/erp/models/user.model';
import { UserService } from 'src/app/erp/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  notify: string = '';
  badNotify: string = '';
  WorseNotify: string = '';
  show: boolean = false;

  constructor(private userService: UserService, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Registrar Usuarios');
  }

  showPassword() {
    this.show = !this.show;
  }

  deleteNotify() {
    setTimeout(() => {
      this.notify = '';
      this.badNotify = '';
      this.WorseNotify = '';
    }, 3000);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordsNotMatch: true };
  }

  formUser = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.passwordMatchValidator,
    ]),
  });

  addUser(): void {
    var user = this.formUser.value;
    var newUser = new User();
    if (user && user.email) {
      newUser.emailUsuario = user.email;
    }
    if (user && user.password) {
      if (user.password == user.confirmPassword) {
        newUser.passwordUsuario = user.password;

        this.userService.createUser(newUser).subscribe({
          next: (res) => {
            console.log('Creado Exitosamente', res);
            this.notify = 'creación de usuario';
            this.deleteNotify();
          },
          error: (err) => {
            if (
              err.error.message == `User ${newUser.emailUsuario} already exist`
            ) {
              this.WorseNotify = 'El email ya existe';
            } else {
              this.badNotify = 'creación de usuario';
            }

            this.deleteNotify();
          },
        });
      } else {
        this.badNotify = 'creación de usuario';
        this.deleteNotify();
      }
    }

    this.clearInputs();
  }

  clearInputs(): void {
    this.formUser.reset();
  }
}
