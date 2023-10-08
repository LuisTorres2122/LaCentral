import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Glass, SGlass } from 'src/app/erp/models/glass.model';
import { Materials } from 'src/app/erp/models/materials.model';
import { ResponseCRUD } from 'src/app/erp/models/responseCRUD.model';
import { GlassService } from 'src/app/erp/services/glass.service';

@Component({
  selector: 'app-glass',
  templateUrl: './glass.component.html',
})
export class GlassComponent {
  title: string = 'Vidrio';
  notify: string = '';
  badNotify: string = '';
  glasses: Glass[] = [];
  toggleForm: boolean = false;
  toggleUpd: boolean = false;
  toggleDel: boolean = false;
  lastIdUpdated: number;
  lastIdDeleted: number;
  lastIdDeletedIndex: number;
  materials: Materials[] = [];
  UsingMaterial: Materials;
  header: string[] = ['Id', 'Tipo', 'Material', 'Precio', ' '];
  elementsGlass: string[] = [
    'pkIdVidrio',
    'tipoVidrio',
    'nombreMaterial',
    'precioVidrio',
  ];

  constructor(private glassService: GlassService) {}

  deleteNotify() {
    setTimeout(() => {
      this.notify = '';
      this.badNotify = '';
    }, 3000);
  }

  formGlassCreate = new FormGroup({
    name: new FormControl('Vidrio'),
    types: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    price: new FormControl('', Validators.required),
  });

  formGlassUpdate = new FormGroup({
    name: new FormControl('Vidrio'),
    types: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    price: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.chargeGlasses();
    this.getMaterial();
  }

  configureMaterial(): number {
    const materialGlass = this.materials.find(
      (material) =>
        material.nombreMaterial.toLowerCase() === 'Vidrio'.toLowerCase()
    );
    if (materialGlass !== undefined) {
      return materialGlass.pkIdMaterial;
    }
    return -1;
  }

  recieveToggle(toggle: boolean): void {
    this.toggleForm = true;
  }

  chargeGlasses(): void {
    this.glassService.getData().subscribe((data: any) => {
      this.glasses = data;
    });
  }
  closeToggleCreate(): void {
    this.toggleForm = false;
    this.clearInputs();
  }

  getMaterial(): void {
    this.glassService.getMaterial().subscribe((data: any) => {
      this.materials = data;
    });
  }

  addGlass(): void {
    var glass = this.formGlassCreate.value;
    var newGlass = new SGlass();
    if (glass && glass.types) {
      newGlass.tipoVidrio = glass.types;
    }
    if (glass && glass.price) {
      newGlass.precioVidrio = parseFloat(glass.price);
    }

    newGlass.fkIdMaterial = this.configureMaterial();
    if (newGlass.fkIdMaterial == -1) {
      this.badNotify = 'creación de vidrio';
      this.deleteNotify();
    }

    var newShowGlass = new Glass();
    newShowGlass.nombreMaterial = 'Vidrio';
    newShowGlass.precioVidrio = newGlass.precioVidrio;
    newShowGlass.tipoVidrio = newGlass.tipoVidrio;
    if (this.glasses.length < 0) {
      newShowGlass.pkIdVidrio = 1;
    }

    this.glassService.createGlass(newGlass).subscribe({
      next: (res) => {
        console.log('Creado Exitosamente', res);
        if (this.glasses.length > 0) {
          const lastElement = this.glasses[this.glasses.length - 1];
          newShowGlass.pkIdVidrio = lastElement.pkIdVidrio + 1;
        } else {
          newShowGlass.pkIdVidrio = 1;
        }

        this.glasses.push(newShowGlass);
        this.notify = 'creación de vidrio';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'creación de vidrio';
        this.deleteNotify();
      },
    });
    this.clearInputs();
  }

  transferData(response: ResponseCRUD): void {
    this.toggleUpd = response.toggle;
    this.formGlassUpdate.patchValue({
      name: response.element.nombreMaterial,
      types: response.element.tipoVidrio,
      price: response.element.precioVidrio,
    });
    this.lastIdUpdated = response.id;
  }

  updateGlass(): void {
    var glass = this.formGlassUpdate.value;

    var updatedGlass = new SGlass();

    if (glass && glass.types) {
      updatedGlass.tipoVidrio = glass.types;
    }
    if (glass && glass.price) {
      updatedGlass.precioVidrio = parseFloat(glass.price);
    }
    updatedGlass.pkIdVidrio = this.lastIdUpdated;
    updatedGlass.fkIdMaterial = this.configureMaterial();
    var newShowGlass = new Glass();
    newShowGlass.nombreMaterial = 'Vidrio';
    newShowGlass.precioVidrio = updatedGlass.precioVidrio;
    newShowGlass.tipoVidrio = updatedGlass.tipoVidrio;
    newShowGlass.pkIdVidrio = updatedGlass.pkIdVidrio;
    console.log(updatedGlass);
    console.log(this.configureMaterial());
    this.glassService.updateGlass(this.lastIdUpdated, updatedGlass).subscribe({
      next: (response) => {
        console.log('Actualizado Exitosamente');
        this.glasses[this.findIndexList(newShowGlass)] = newShowGlass;
        this.closeUpdateToggle();
        this.notify = 'actualización de vidrio';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'actualización de vidrio';
        this.deleteNotify();
      },
    });
  }

  findIndexList(glass: Glass): number {
    return this.glasses.findIndex(
      (sGlass) => sGlass.pkIdVidrio === glass.pkIdVidrio
    );
  }

  showDeleteForm(response: ResponseCRUD): void {
    this.toggleDel = response.toggle;
    this.lastIdDeleted = response.id;
    this.lastIdDeletedIndex = this.findIndexList(response.element);
  }

  deleteGlass(): void {
    this.glassService.deleteGlass(this.lastIdDeleted).subscribe({
      next: (response) => {
        console.log('Eliminado Exitosamente');
        console.log(response);
        this.notify = 'eliminación de vidrio';
        this.glasses.splice(this.lastIdDeletedIndex, 1);
        this.deleteNotify();
        this.toggleDel = false;
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'eliminación de vidrio';
        this.deleteNotify();
      },
    });
  }

  closeDeleteToggle(): void {
    this.toggleDel = false;
  }

  closeUpdateToggle(): void {
    this.toggleUpd = false;
  }

  clearInputs(): void {
    this.formGlassCreate.reset();
  }
}
