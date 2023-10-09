import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Fillet, SFillet } from 'src/app/erp/models/fillet.model';
import { Materials } from 'src/app/erp/models/materials.model';
import { ResponseCRUD } from 'src/app/erp/models/responseCRUD.model';
import { FilletService } from 'src/app/erp/services/fillet.service';

@Component({
  selector: 'app-fillet',
  templateUrl: './fillet.component.html',
})
export class FilletComponent {
  title: string = 'Filete';
  notify: string = '';
  badNotify: string = '';
  fillets: Fillet[] = [];
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
    'pkIdFilete',
    'tipoFilete',
    'nombreMaterial',
    'precioFilete',
  ];

  constructor(private filletService: FilletService,  private titleService: Title) {}

  deleteNotify() {
    setTimeout(() => {
      this.notify = '';
      this.badNotify = '';
    }, 3000);
  }

  formGlassCreate = new FormGroup({
    name: new FormControl('Filete'),
    types: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    price: new FormControl('', Validators.required),
  });

  formGlassUpdate = new FormGroup({
    name: new FormControl('Filete'),
    types: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    price: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.chargeFillets();
    this.getMaterial();
    this.titleService.setTitle('Filetes');
  }

  configureMaterial(): number {
    const materialGlass = this.materials.find(
      (material) =>
        material.nombreMaterial.toLowerCase() === 'Filete'.toLowerCase()
    );
    if (materialGlass !== undefined) {
      return materialGlass.pkIdMaterial;
    }
    return -1;
  }

  recieveToggle(toggle: boolean): void {
    this.toggleForm = true;
  }

  chargeFillets(): void {
    this.filletService.getData().subscribe((data: any) => {
      this.fillets = data;
    });
  }
  closeToggleCreate(): void {
    this.toggleForm = false;
    this.clearInputs();
  }

  getMaterial(): void {
    this.filletService.getMaterial().subscribe((data: any) => {
      this.materials = data;
    });
  }

  addFillet(): void {
    var glass = this.formGlassCreate.value;
    var newGlass = new SFillet();
    if (glass && glass.types) {
      newGlass.tipoFilete = glass.types;
    }
    if (glass && glass.price) {
      newGlass.precioFilete = parseFloat(glass.price);
    }

    newGlass.fkIdMaterial = this.configureMaterial();
    if (newGlass.fkIdMaterial == -1) {
      this.badNotify = 'creación de filete';
      this.deleteNotify();
    }

    var newShowGlass = new Fillet();
    newShowGlass.nombreMaterial = 'Filete';
    newShowGlass.precioFilete = newGlass.precioFilete;
    newShowGlass.tipoFilete = newGlass.tipoFilete;
console.log(this.fillets);
    if (this.fillets.length < 0) {
      newShowGlass.pkIdFilete = 1;
    }

    this.filletService.createFillet(newGlass).subscribe({
      next: (res) => {
        console.log('Creado Exitosamente', res);
        if (this.fillets.length > 0) {
          const lastElement = this.fillets[this.fillets.length - 1];
          newShowGlass.pkIdFilete = lastElement.pkIdFilete + 1;
        } else {
          newShowGlass.pkIdFilete = 1;
        }

        this.fillets.push(newShowGlass);
        this.notify = 'creación de filete';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'creación de filete';
        this.deleteNotify();
      },
    });
    this.clearInputs();
  }

  transferData(response: ResponseCRUD): void {
    this.toggleUpd = response.toggle;
    this.formGlassUpdate.patchValue({
      name: response.element.nombreMaterial,
      types: response.element.tipoFilete,
      price: response.element.precioFilete,
    });
    this.lastIdUpdated = response.id;
  }

  updateFillet(): void {
    var glass = this.formGlassUpdate.value;

    var updatedFillet = new SFillet();

    if (glass && glass.types) {
      updatedFillet.tipoFilete = glass.types;
    }
    if (glass && glass.price) {
      updatedFillet.precioFilete = parseFloat(glass.price);
    }
    updatedFillet.pkIdFilete = this.lastIdUpdated;
    updatedFillet.fkIdMaterial = this.configureMaterial();
    var newShowFillet = new Fillet();
    newShowFillet.nombreMaterial = 'Vidrio';
    newShowFillet.precioFilete = updatedFillet.precioFilete;
    newShowFillet.tipoFilete = updatedFillet.tipoFilete;
    newShowFillet.pkIdFilete = updatedFillet.pkIdFilete;
    this.filletService
      .updateFillet(this.lastIdUpdated, updatedFillet)
      .subscribe({
        next: (response) => {
          console.log('Actualizado Exitosamente');
          this.fillets[this.findIndexList(newShowFillet)] = newShowFillet;
          this.closeUpdateToggle();
          this.notify = 'actualización de filete';
          this.deleteNotify();
        },
        error: (err) => {
          console.log(err);
          this.badNotify = 'actualización de filete';
          this.deleteNotify();
        },
      });
  }

  findIndexList(fillet: Fillet): number {
    return this.fillets.findIndex(
      (sGlass) => sGlass.pkIdFilete === fillet.pkIdFilete
    );
  }

  showDeleteForm(response: ResponseCRUD): void {
    this.toggleDel = response.toggle;
    this.lastIdDeleted = response.id;
    this.lastIdDeletedIndex = this.findIndexList(response.element);
  }

  deleteFillet(): void {
    this.filletService.deleteFillet(this.lastIdDeleted).subscribe({
      next: (response) => {
        console.log('Eliminado Exitosamente');
        this.notify = 'eliminación de filete';
        this.fillets.splice(this.lastIdDeletedIndex, 1);
        this.deleteNotify();
        this.toggleDel = false;
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'eliminación de filete';
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
