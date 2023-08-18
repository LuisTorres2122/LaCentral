import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css'],
})
export class PieceComponent implements OnInit, AfterViewInit {
  pieceId: string | null;
  show: boolean = false;

 

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pieceId = params.get('id');
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  showPicture(): void {
  
    this.show = true;
  }

  hidePicture(): void {
    this.show = false;
  }

  

 
}
