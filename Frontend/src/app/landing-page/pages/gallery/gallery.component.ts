import { Component } from '@angular/core';

import { PieceService } from '../../services/piece.service';
import { Piece } from '../../models/piece.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  pieces: Piece[] = [];
  selectedPiece: Piece;
  showDetailsPiece: boolean = false;

  constructor(private pieceService: PieceService) {}

  ngOnInit(): void {
    this.getPieces();
   
  }

  closeDetails(status: boolean):void{
    this.showDetailsPiece= status;
  }

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  setPiece(piece:Piece){
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
