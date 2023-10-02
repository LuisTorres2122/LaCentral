import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  badNotify: string = '';
  password: string = '';
  show: boolean = false;
  currentIndex:number = 0;
  currentImage: string = '';
  showImage: boolean = false;

  constructor(private userService: UserService,
              private router: Router){}

  images = [
    './../../../assets/images/enmarcado/enmarcado/mujer.jpg',
    './../../../assets/images/enmarcado/enmarcado/doscaras.jpg',
    './../../../assets/images/enmarcado/enmarcado/Toro-.png',
  ];

  ngOnInit(): void {
    this.currentImage = this.images[this.currentIndex];
    this.showImage = true;
    setInterval(() => {
      this.changeImage();
    }, 3000);
  }

  deleteNotify() {
    setTimeout(() => {
      this.badNotify = '';
    }, 3000);
  }

  formUser = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [Validators.required]),
  });

  showPassword() {
    this.show = !this.show;
  }
  changeImage() {
    this.showImage = false;

    this.currentIndex = (this.currentIndex + 1) % this.images.length;

    setTimeout(() => {
      this.currentImage = this.images[this.currentIndex];
      this.showImage = true;
    }, 500);
  }

  login():void{
      var user = this.formUser.value;
      var params = new User();
      if(user && user.email){
        params.email = user.email;
      }
      if(user && user.password){
        params.password = user.password;
      }
      console.log(params);

    this.userService.getToken(params).subscribe({
      next: (res) => {
        console.log(`Bienvenido ${params.email}`);
        console.log(res);
        localStorage.setItem("token",res.token);
        this.router.navigate(['/erp'])
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'Algo salio mal';
        this.deleteNotify();

      }
    });
  }

}
