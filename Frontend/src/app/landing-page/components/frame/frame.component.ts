import { Component } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html'
})
export class FrameComponent {
  images: string[] = [
    '../../../../assets/images/enmarcado/molduras/mol1.jpg',
    '../../../../assets/images/enmarcado/molduras/mol2.jpg',
    '../../../../assets/images/enmarcado/molduras/mol3.jpg',
    '../../../../assets/images/enmarcado/molduras/mol4.jpg',
    '../../../../assets/images/enmarcado/molduras/mol5.jpg',
    '../../../../assets/images/enmarcado/molduras/mol6.jpg',
    '../../../../assets/images/enmarcado/molduras/mol7.jpg',
    '../../../../assets/images/enmarcado/molduras/mol8.jpg',
    '../../../../assets/images/enmarcado/molduras/mol9.jpg',
    '../../../../assets/images/enmarcado/molduras/mol10.jpg',
    '../../../../assets/images/enmarcado/molduras/mol11.jpg',
    '../../../../assets/images/enmarcado/molduras/mol12.jpg',
    '../../../../assets/images/enmarcado/molduras/mol13.jpg',
    '../../../../assets/images/enmarcado/molduras/mol14.jpg',
    '../../../../assets/images/enmarcado/molduras/mol15.jpg',
    '../../../../assets/images/enmarcado/molduras/mol16.jpg',
    '../../../../assets/images/enmarcado/molduras/mol17.jpg',
    '../../../../assets/images/enmarcado/molduras/mol17.jpg',
   
   
  
  
  ];
  
  translateValue: number = 0;
  
  moveCarousel(offset: number) {
    this.translateValue += offset;
    
    const maxTranslate = -((this.images.length - 4) * 120); 
    const minTranslate = -0;
  
    if (this.translateValue > minTranslate) {
      this.translateValue = maxTranslate; 
    } else if (this.translateValue < maxTranslate) {
      this.translateValue = minTranslate; 
    }
  }
}
