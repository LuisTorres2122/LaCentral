import { AfterViewInit, Component } from '@angular/core';
import { Piece } from 'src/app/shared/models/piece.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  currentIndex = 0;
  currentImage: string = '';
  showImage: boolean = false;
  pieces: Piece[] = [];
  images = [
    './../../../assets/images/mujer.jpg',
    './../../../assets/images/doscaras.jpg',
    './../../../assets/images/ciudad.jpg',
  ];

  ngOnInit(): void {
    this.pieces = [{id: "p1", description: "esta es una pieza que se describe con uuna sdfsdfsdfsdfffddddddddddddddddd", price: 552200, image: "../../../../assets/images/enmarcado/servicios/enmarcado9.jpg", position: true},
    {id: "p1ad", description: "piesa 1", image: "../../../../assets/images/enmarcado/servicios/enmarcado5.jpg", position: true},
{id: "p1", description: "piesa 1", price: 5500, image: "../../../../assets/images/enmarcado/enmarcado/mujer.jpg", position: true},
{id: "p1", description: "piesa 1", price: 5500, image: "../../../../assets/images/enmarcado/enmarcado/ciudad.jpg", position: false},
{id: "p3", description: "esta es una pieza que se describe con uuna sdfsdfsdfsdfffddddddddddddddddd", price: 500, image: "../../../../assets/images/enmarcado/enmarcado/Toro-.png", position: true},
{id: "p5", description: "piesa 1", image: "../../../../assets/images/enmarcado/enmarcado/doscaras.jpg", position: true},
{id: "p1", description: "piesa 1", price: 5500, image: "../../../../assets/images/enmarcado/servicios/enmarcado9.jpg", position: false}];
    this.currentImage = this.images[this.currentIndex];
    this.showImage = true;
    setInterval(() => {
      this.changeImage();
    }, 3000);
  }
  ngAfterViewInit(): void {
    this.scrollToTop();
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

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
