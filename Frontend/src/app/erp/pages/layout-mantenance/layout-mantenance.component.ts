import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ResponseCRUD } from '../../models/responseCRUD.model';


@Component({
  selector: 'app-layout-mantenance',
  templateUrl: './layout-mantenance.component.html'
})
export class LayoutMantenanceComponent {
  @Input() headers: string[];
  @Input() elements: any[] ;
  @Input() elementsTypes: string[];
  @Input() view: boolean = false;
  search: string;
  toggleOpts: boolean[] = [];
  @Output() toggle = new EventEmitter<any>();
  @Output() toggledelete = new EventEmitter<ResponseCRUD>();
  @Output() updatedForm = new EventEmitter<ResponseCRUD>();
  @Output() ViewForm = new EventEmitter<ResponseCRUD>();

  FilterElements: any[] = [];

  page: number = 1;

  toggleForm(toggle: boolean) {
    this.toggle.emit(toggle);
  }

  toggleDeleteForm(element: any, toggle:boolean, id:number):void {
    var newDelete = {element, toggle, id}
    this.toggledelete.emit(newDelete);
  }

  sendData(element: any, toggle: boolean, id: number) {
    var newElement = { element, toggle, id };
    this.updatedForm.emit(newElement);
  }

  sendImage(element: any, toggle: boolean, id: number) {
    var newElement = { element, toggle, id };
    this.ViewForm.emit(newElement);
  }

  findIndexList(element: any): number {
    return this.elements.findIndex(
      (el) => el[this.elementsTypes[0]] == element[this.elementsTypes[0]]
    );
  }

  transferData(element: any, index: number): void {
    this.toggleOpts[index] = false;
    const indextest = this.findIndexList(element);

    this.sendData(element, true, element[this.elementsTypes[0]]);
  }
 
  transferImage(element: any, index: number): void {
    this.toggleOpts[index] = false;
    const indextest = this.findIndexList(element);
    this.sendImage(element, true, element[this.elementsTypes[0]]);

  }

  loadElement(position: number): any[] {
    let sourceArray = this.FilterElements.length > 0 ? this.FilterElements : this.elements;
    let registers = sourceArray.length;
    let col = Math.ceil(registers / 10);
  
    if (col < 2 && position === 1) {
      return sourceArray.slice(0, 9);
    } else {
      let initialRange = (position - 1) * 10;
      let endRange = Math.min(initialRange + 10, registers);
      return sourceArray.slice(initialRange, endRange);
    }
  }


  buscarElements(): void {
    this.page = 1;
    this.FilterElements = this.elements.filter((ele: any) => {
      const value = ele[this.elementsTypes[1]];
  
      if (typeof value === 'string') {
        return value.toLowerCase().includes(this.search.toLowerCase());
      } else if (typeof value === 'number') {
        return value.toString().includes(this.search.toLowerCase());
      }
  
      return false;
    });
  }

  pagesAvailable(): number {
    let col;
    if (this.FilterElements.length == 0) {
      col = this.elements.length / 10;
    } else {
      col = this.FilterElements.length / 10;
    }

    if (col % 1 !== 0) {
      return Math.ceil(col);
    } else {
      return col;
    }
  }

  setPage(position: number): void {
    if (position > this.pagesAvailable()) {
      this.page = position - 1;
    } else {
      this.page = position;
    }
  }

  previosPage(): number {
    if (this.page == 1) {
      return (this.page = 1);
    } else {
      return (this.page -= 1);
    }
  }

  nextPage(): number {
    if (this.page >= this.pagesAvailable()) {
      return (this.page = this.pagesAvailable());
    } else {
      return (this.page += 1);
    }
  }

  elementsRange(position: number): string {
    let initialRange = position * 10 - 9;
    let endRange = initialRange + 9;
    if (this.FilterElements.length == 0) {
      if (endRange > this.elements.length) {
        return `${initialRange} - ${this.elements.length}`;
      } else {
        return `${initialRange} - ${endRange}`;
      }
    } else {
      if (endRange > this.FilterElements.length) {
        return `${initialRange} - ${this.FilterElements.length}`;
      } else {
        return `${initialRange} - ${endRange}`;
      }
    }
  }

  elementsNumber(): number {
    if (this.FilterElements.length == 0) {
      return this.elements.length;
    } else {
      return this.FilterElements.length;
    }
  }

 
  switchToggleOptions(id: number): void {
    if (this.toggleOpts[id]) {
      this.toggleOpts[id] = false;
    } else {
      this.toggleOpts[id] = true;
    }
  }

  switchToogleCreate(): void {
    this.toggleForm(true);
  }

  switchToogledelete(element: any, index:number): void {
    
    this.toggleDeleteForm(element, true, element[this.elementsTypes[0]]); 
  
    this.toggleOpts[index] = false;
  
  }


}
