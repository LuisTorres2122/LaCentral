import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/erp/models/user.model';
import { UserService } from 'src/app/erp/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  show: boolean = false;
  notify: string = '';
  badNotify: string = '';
  WorseNotify: string = '';
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.chargeUsers();
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

  chargeUsers(): void {
    this.userService.getData().subscribe((data: any) => {
      this.users = data;
    });
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
    passPassword: new FormControl('', [Validators.required]),
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

  verify(): User | null {
    var user = this.formUser.value;
    const userFounded = this.users.find((x) => x.emailUsuario === user.email);

    if (userFounded != undefined) {
      if (userFounded.passwordUsuario == user.passPassword) {
        return userFounded;
      }
    }
    return null;
  }

  updateUser(): void {
    var user = this.formUser.value;
    var newUser = new User();
    let validation = this.verify();

    if (validation != null) {
      newUser.emailUsuario = validation.emailUsuario;
      if (user && user.password) {
        newUser.passwordUsuario = user.password;
      }

      newUser.pkIdUsuario = validation.pkIdUsuario;
      this.userService.updateUser(newUser.pkIdUsuario, newUser).subscribe({
        next: (res) => {
          console.log('Actualizado Exitosamente', res);
          this.notify = 'creación de usuario';
          this.deleteNotify();
        },
        error: (err) => {
          console.log(err);
          if (
            err.error.message == `User ${newUser.emailUsuario} already exist`
          ) {
            this.WorseNotify = 'El email ya existe';
          } else {
            this.badNotify = 'actualizacion de usuario';
          }

          this.deleteNotify();
        },
      });
    } else {
      this.badNotify = 'actualizacion de usuario ';
      this.deleteNotify();
    }

    this.clearInputs();
  }

  clearInputs(): void {
    this.formUser.reset();
  }
}
