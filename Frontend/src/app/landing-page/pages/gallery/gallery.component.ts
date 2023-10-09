import { Component, OnInit } from '@angular/core';

import { PieceService } from '../../services/piece.service';
import { Piece } from '../../models/piece.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  pieces: Piece[] = [];
  selectedPiece: Piece;
  showDetailsPiece: boolean = false;

  constructor(
    private pieceService: PieceService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getPieces();
    this.titleService.setTitle('Galeria');
  }

  closeDetails(status: boolean): void {
    this.showDetailsPiece = status;
  }

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  setPiece(piece: Piece) {
    this.selectedPiece = piece;
    this.showDetailsPiece = true;
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

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
