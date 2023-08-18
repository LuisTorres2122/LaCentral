import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:string ='';
  password:string ='';
  show: boolean = false;
  currentIndex = 0;
  currentImage: string = '';
  showImage: boolean = false;

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

  

  showPassword(){
    this.show = !this.show;
   }

   changeImage() {
    // Ocultar la imagen actual
    this.showImage = false;

    // Cambiar al siguiente índice de imagen
    this.currentIndex = (this.currentIndex + 1) % this.images.length;

    // Establecer la nueva imagen y mostrarla después de 500 ms
    setTimeout(() => {
      this.currentImage = this.images[this.currentIndex];
      this.showImage = true;
    }, 500);
  }
   

}
