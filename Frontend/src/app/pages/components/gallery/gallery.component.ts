import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Piece } from 'src/app/shared/models/piece.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit{
  pieces: Piece[] = [];

  ngOnInit(): void {
      this.pieces = [{id: "p1", description: "esta es una pieza que se describe con uuna sdfsdfsdfsdfffddddddddddddddddd", price: 552200, image: "../../../../assets/images/enmarcado/servicios/enmarcado9.jpg", position: true},
      {id: "p1ad", description: "piesa 1", image: "../../../../assets/images/enmarcado/servicios/enmarcado5.jpg", position: true},
  {id: "p1", description: "piesa 1", price: 5500, image: "../../../../assets/images/enmarcado/enmarcado/mujer.jpg", position: true},
  {id: "p1", description: "piesa 1", price: 5500, image: "../../../../assets/images/enmarcado/enmarcado/ciudad.jpg", position: false},
  {id: "p3", description: "esta es una pieza que se describe con uuna sdfsdfsdfsdfffddddddddddddddddd", price: 500, image: "../../../../assets/images/enmarcado/enmarcado/Toro-.png", position: true},
  {id: "p5", description: "piesa 1", image: "../../../../assets/images/enmarcado/enmarcado/doscaras.jpg", position: true},
  {id: "p1", description: "piesa 1", price: 5500, image: "../../../../assets/images/enmarcado/servicios/instalacion2.jpg", position: false},
{id: "p1", description: "piesa 1", price: 5500, image: "../../../../assets/images/enmarcado/servicios/enmarcado9.jpg", position: true}]
  }
  ngAfterViewInit(): void {
    this.scrollToTop();

  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
