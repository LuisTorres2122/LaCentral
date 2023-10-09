import { Component } from '@angular/core';
import { Piece } from '../../models/piece.model';
import { PieceService } from '../../services/piece.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  currentIndex: number = 0;
  pieces: Piece[] = [];
  currentImage: string = '';
  showImage: boolean = false;

  constructor(
    private pieceService: PieceService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getPieces();
    this.titleService.setTitle('LaCentral');
  }

  getImportanPices(): Piece[] {
    return this.pieces.filter((x) => x.importanciaObra < 10);
  }

  getPieces(): void {
    this.pieceService.getData().subscribe((data: any) => {
      this.pieces = data;
      console.log(this.pieces);
    });
  }

  base64ToImage(base64: string) {
    return 'data:image/png;base64,' + base64;
  }
  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
