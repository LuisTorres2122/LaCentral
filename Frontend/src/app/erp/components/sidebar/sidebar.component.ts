import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  toggleMant:boolean = false;
  toggleOrder:boolean = false;
  toggleUsers:boolean = false;
  toggleReporters:boolean = false;
  toggleOptions:string [] = ["maintenance", "order", "user","report"];

  changeToggle(option:string):void{
    switch(option){
      case this.toggleOptions[0]:
      if(this.toggleMant){
        this.toggleMant = false;
      }
      else{
        this.toggleMant = true;
      }
      break;
      case this.toggleOptions[1]:
      if(this.toggleOrder){
        this.toggleOrder = false;
      }
      else{
        this.toggleOrder = true;
      }
      break;
      case this.toggleOptions[2]:
      if(this.toggleUsers){
        this.toggleUsers = false;
      }
      else{
        this.toggleUsers = true;
      }
      break;
      case this.toggleOptions[3]:
      if(this.toggleReporters){
        this.toggleReporters = false;
      }
      else{
        this.toggleReporters = true;
      }
      break;
    }

    
}
}
