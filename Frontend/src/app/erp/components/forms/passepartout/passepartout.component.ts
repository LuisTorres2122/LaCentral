import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Materials } from 'src/app/erp/models/materials.model';
import { Passepartout, SPassepartout } from 'src/app/erp/models/passepartout.model';
import { ResponseCRUD } from 'src/app/erp/models/responseCRUD.model';
import { PassepartoutService } from 'src/app/erp/services/passepartout.service';

@Component({
  selector: 'app-passepartout',
  templateUrl: './passepartout.component.html'
})
export class PassepartoutComponent {
  title: string = 'Passepartout';
  notify: string = '';
  badNotify: string = '';
  passepatouts: Passepartout[] = [];
  toggleForm: boolean = false;
  toggleUpd: boolean = false;
  toggleDel: boolean = false;
  lastIdUpdated: number;
  lastIdDeleted: number;
  lastIdDeletedIndex: number;
  materials: Materials[] = [];
  UsingMaterial: Materials;
  header: string[] = ['Id', 'Codigo', 'Material', 'Color' ,' '];
  elementsPassepartout: string[] = [
    'pkIdPassepartout',
    'codigoPassepartout',
    'nombreMaterial',
    'colorPassepartout'
  ];


  constructor(private PassService: PassepartoutService) {}

  deleteNotify() {
    setTimeout(() => {
      this.notify = '';
      this.badNotify = '';
    }, 3000);
  }

  formPassCreate = new FormGroup({
    name: new FormControl('Passepartout'),
    code: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });

  formPassUpdate = new FormGroup({
    name: new FormControl('Passepartout'),
    code: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.chargePass();
    this.getMaterial();
  }

  configureMaterial(): number {
    const materialGlass = this.materials.find(
      (material) =>
        material.nombreMaterial.toLowerCase() === 'Passepartout'.toLowerCase()
    );
    if (materialGlass !== undefined) {
      return materialGlass.pkIdMaterial;
    }
    console.log(materialGlass);
    return -1;
  }

  recieveToggle(toggle: boolean): void {
    this.toggleForm = true;
  }

  chargePass(): void {
    this.PassService.getData().subscribe((data: any) => {
      this.passepatouts = data;
    });
  }
  closeToggleCreate(): void {
    this.toggleForm = false;
    this.clearInputs();
  }

  getMaterial(): void {
    this.PassService.getMaterial().subscribe((data: any) => {
      this.materials = data;
    });
  }

  addPass(): void {
    var pass = this.formPassCreate.value;
    var newPass = new SPassepartout();
    if (pass && pass.code) {
      newPass.codigoPassepartout = pass.code;
    }

    if (pass && pass.color) {
      newPass.colorPassepartout = pass.color;
    }

    newPass.fkIdMaterial = this.configureMaterial();
    if (newPass.fkIdMaterial == -1) {
      this.badNotify = 'creación de passepartout';
      this.deleteNotify();
    }

    var newShowPass = new Passepartout();
    newShowPass.nombreMaterial = 'Passepartout';
    newShowPass.codigoPassepartout = newPass.codigoPassepartout;

    newShowPass.colorPassepartout = newPass.colorPassepartout;
    if (this.passepatouts.length < 0) {
      newShowPass.pkIdPassepartout = 1;
    }

    this.PassService.createPass(newPass).subscribe({
      next: (res) => {
        console.log('Creado Exitosamente', res);
        if (this.passepatouts.length > 0) {
          const lastElement = this.passepatouts[this.passepatouts.length - 1];
          newShowPass.pkIdPassepartout = lastElement.pkIdPassepartout + 1;
        }else{
          newShowPass.pkIdPassepartout = 1;
          
        }
       
        this.passepatouts.push(newShowPass);
        this.notify = 'creación de passepartout';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'creación de passepartout';
        this.deleteNotify();
      },
    });
    this.clearInputs();
  }

  transferData(response: ResponseCRUD): void {
    this.toggleUpd = response.toggle;
    this.formPassUpdate.patchValue({
      name: response.element.nombreMaterial,
      code: response.element.codigoPassepartout,
      color: response.element.colorPassepartout,
    });
    this.lastIdUpdated = response.id;
  
  }

  updatePass(): void {
    var pass = this.formPassUpdate.value;

    var updatedPass = new SPassepartout();

    if (pass && pass.code) {
      updatedPass.codigoPassepartout = pass.code;
    }
    if (pass && pass.color) {
      updatedPass.colorPassepartout = pass.color;
    }
    updatedPass.pkIdPassepartout = this.lastIdUpdated;
    updatedPass.fkIdMaterial = this.configureMaterial();
    var newShowPass = new Passepartout();
    newShowPass.nombreMaterial = 'Passepartout';
    newShowPass.codigoPassepartout = updatedPass.codigoPassepartout;
    newShowPass.pkIdPassepartout = updatedPass.pkIdPassepartout;
    newShowPass.colorPassepartout = updatedPass.colorPassepartout;
    console.log(this.configureMaterial());
    this.PassService.updatePass(this.lastIdUpdated, updatedPass)
    .subscribe({
      next: (response) => {
        console.log('Actualizado Exitosamente');
        this.passepatouts[this.findIndexList(newShowPass)] = newShowPass;
        this.closeUpdateToggle();
        this.notify = 'actualización de passepartout';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'actualización de passepartout';
        this.deleteNotify();
      },
    });
  }

  findIndexList(pass: Passepartout): number {
    return this.passepatouts.findIndex(
      (sGlass) => sGlass.pkIdPassepartout === pass.pkIdPassepartout
    );
  }

  showDeleteForm(response: ResponseCRUD): void {
    this.toggleDel = response.toggle;
    this.lastIdDeleted = response.id;
    this.lastIdDeletedIndex = this.findIndexList(response.element);
  }

  deletePass(): void {
    this.PassService.deletePass(this.lastIdDeleted).subscribe({
      next: (response) => {
        console.log('Eliminado Exitosamente');
        this.notify = 'eliminación de passepartout';
        this.passepatouts.splice(this.lastIdDeletedIndex, 1);
        this.deleteNotify();
        this.toggleDel = false;
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'eliminación de passepartout';
        this.deleteNotify();
      }
    }
    );
  }

  closeDeleteToggle(): void {
    this.toggleDel = false;
  }

  closeUpdateToggle(): void {
    this.toggleUpd = false;
  }

  clearInputs(): void {
    this.formPassCreate.reset();
  }
}
