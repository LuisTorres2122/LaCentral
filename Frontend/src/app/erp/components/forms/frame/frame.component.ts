import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Frame, SFrame } from 'src/app/erp/models/frame.model';
import { Materials } from 'src/app/erp/models/materials.model';
import { ResponseCRUD } from 'src/app/erp/models/responseCRUD.model';
import { FrameService } from 'src/app/erp/services/frame.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html'
})
export class FrameComponent {
  title: string = 'Marco';
  notify: string = '';
  badNotify: string = '';
  frames: Frame[] = [];
  toggleForm: boolean = false;
  toggleUpd: boolean = false;
  toggleDel: boolean = false;
  lastIdUpdated: number;
  lastIdDeleted: number;
  lastIdDeletedIndex: number;
  materials: Materials[] = [];
  UsingMaterial: Materials;
  header: string[] = ['Id', 'Codigo', 'Material', 'Precio', ' '];
  elementsFrames: string[] = [
    'pkIdMarco',
    'codigoMarco',
    'nombreMaterial',
    'precioMarco'
  ];
 

  constructor(private frameService: FrameService) {}

  deleteNotify() {
    setTimeout(() => {
      this.notify = '';
      this.badNotify = '';
    }, 3000);
  }

  formFrameCreate = new FormGroup({
    name: new FormControl('Marco'),
    code: new FormControl('', Validators.required,),
    price: new FormControl('', Validators.required),
  });

  formFrameUpdate = new FormGroup({
    name: new FormControl('Marco'),
    code: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.chargeFrames();
    this.getMaterial();
  }

  configureMaterial(): number {
    const materialFrame = this.materials.find(
      (material) =>
        material.nombreMaterial.toLowerCase() === 'Marco'.toLowerCase()
    );
    if (materialFrame !== undefined) {
      return materialFrame.pkIdMaterial;
    }
    return -1;
  }

  recieveToggle(toggle: boolean): void {
    this.toggleForm = true;
  }

  chargeFrames(): void {
    this.frameService.getData().subscribe((data: any) => {
      this.frames = data;
    });
  }
  closeToggleCreate(): void {
    this.toggleForm = false;
    this.clearInputs();
  }

  getMaterial(): void {
    this.frameService.getMaterial().subscribe((data: any) => {
      this.materials = data;
    });
  }

  addFrame(): void {
    var frame = this.formFrameCreate.value;
    var newFrame = new SFrame();
    if (frame && frame.code) {
      newFrame.codigoMarco = frame.code;
    }
    if (frame && frame.price) {
      newFrame.precioMarco = parseFloat(frame.price);
    }

    newFrame.fkIdMaterial = this.configureMaterial();
    if (newFrame.fkIdMaterial == -1) {
      this.badNotify = 'creación de marco';
      this.deleteNotify();
    }

    var newShowFrame = new Frame();
    newShowFrame.nombreMaterial = 'Marco';
    newShowFrame.precioMarco = newFrame.precioMarco;
    newShowFrame.codigoMarco = newFrame.codigoMarco;

    this.frameService.createFrame(newFrame).subscribe({
      next: (res) => {
        console.log('Creado Exitosamente', res);
        const lastElement = this.frames[this.frames.length - 1];
        newShowFrame.pkIdMarco = lastElement.pkIdMarco + 1;
        this.frames.push(newShowFrame);
        this.notify = 'creación de marco';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'creación de marco';
        this.deleteNotify();
      },
    });
    this.clearInputs();
  }

  transferData(response: ResponseCRUD): void {
    this.toggleUpd = response.toggle;
    this.formFrameUpdate.patchValue({
      name: response.element.nombreMaterial,
      code: response.element.codigoMarco,
      price: response.element.precioMarco,
    });
    this.lastIdUpdated = response.id;
  
  }

  updateFrame(): void {
    var glass = this.formFrameUpdate.value;

    var updatedFrame = new SFrame();

    if (glass && glass.code) {
      updatedFrame.codigoMarco = glass.code;
    }
    if (glass && glass.price) {
      updatedFrame.precioMarco = parseFloat(glass.price);
    }
    updatedFrame.pkIdMarco = this.lastIdUpdated;
    updatedFrame.fkIdMaterial = this.configureMaterial();
    var newShowFrame = new Frame();
    newShowFrame.nombreMaterial = 'Marco';
    newShowFrame.precioMarco = updatedFrame.precioMarco;
    newShowFrame.codigoMarco = updatedFrame.codigoMarco;
    newShowFrame.pkIdMarco = updatedFrame.pkIdMarco;
    this.frameService.updateFrame(this.lastIdUpdated, updatedFrame)
    .subscribe({
      next: (response) => {
        console.log('Actualizado Exitosamente');
        this.frames[this.findIndexList(newShowFrame)] = newShowFrame;
        this.closeUpdateToggle();
        this.notify = 'actualización de marco';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'actualización de marco';
        this.deleteNotify();
      },
    });
  }

  findIndexList(frame: Frame): number {
    return this.frames.findIndex(
      (sGlass) => sGlass.pkIdMarco === frame.pkIdMarco
    );
  }

  showDeleteForm(response: ResponseCRUD): void {
    this.toggleDel = response.toggle;
    this.lastIdDeleted = response.id;
    this.lastIdDeletedIndex = this.findIndexList(response.element);
  }

  deleteFillet(): void {
    this.frameService.deleteFrame(this.lastIdDeleted).subscribe({
      next: (response) => {
        console.log('Eliminado Exitosamente');
        this.notify = 'eliminación de marco';
        this.frames.splice(this.lastIdDeletedIndex, 1);
        this.deleteNotify();
        this.toggleDel = false;
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'eliminación de marco';
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
    this.formFrameCreate.reset();
  }
}
