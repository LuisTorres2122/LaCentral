import { Component, Input } from '@angular/core';
import { Router, RouterLinkActive} from '@angular/router';



@Component({
  selector: 'app-show-picture',
  templateUrl: './show-picture.component.html',
  styleUrls: ['./show-picture.component.css']
})
export class ShowPictureComponent {
  @Input() image:string=" ";
  @Input() stateImage?:boolean ;
  imageRoute: string="";
  constructor(private router:Router ){

  }

  navegateToComponent():void{
    if(this.stateImage){
     this.imageRoute = '/pagina/enmarcadora'
    }
    else{
      this.imageRoute = 'back'
    }
  }
  

  

}
