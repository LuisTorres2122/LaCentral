import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Piece } from '../../models/piece.model';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html'
})
export class PieceComponent {
  pieceId: string | null;
  @Output() close = new EventEmitter<boolean>();
  @Input() piece: Piece;
  

 



  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  

  base64ToImage() {
  
    return 'data:image/png;base64,' + this.piece.urlObra;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }


  hidePicture(): void {
    this.close.emit(false);
  }

}
