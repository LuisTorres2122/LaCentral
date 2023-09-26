import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseCRUD } from 'src/app/erp/models/responseCRUD.model';
import { Utility } from 'src/app/erp/models/utility.models';
import { UtilityService } from 'src/app/erp/services/utility.service';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css'],
})
export class UtilityComponent {
  title: string = 'Utilidad';
  notify: string = '';
  badNotify: string = '';
  utilities: Utility[] = [];
  toggleForm: boolean = false;
  toggleUpd: boolean = false;
  toggleDel: boolean = false;
  lastIdUpdated: number;
  header: string[] = ['Id', 'Nombre', 'Valor', ' '];
  elementsUtility: string[] = ['pkUtilidad', 'nombreUtilidad', 'valorUtilidad'];

  constructor(private utilityService: UtilityService) {}

  deleteNotify() {
    setTimeout(() => {
      this.notify = '';
      this.badNotify = '';
    }, 3000);
  }

  formPassUpdate = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.chargeUtility(); 
  }

  recieveToggle(toggle: boolean): void {
    this.toggleForm = true;
  }

  chargeUtility(): void {
    this.utilityService.getData().subscribe((data: any) => {
      this.utilities = data;
      console.log(data);
    });
  }
  closeToggleCreate(): void {
    this.toggleForm = false;
  }

  transferData(response: ResponseCRUD): void {
    this.toggleUpd = response.toggle;
    this.formPassUpdate.patchValue({
      name: response.element.nombreUtilidad.trim(),
      value: response.element.valorUtilidad,
    });
    this.lastIdUpdated = response.id;
    
  }

  updateUtility(): void {
    var pass = this.formPassUpdate.value;

    var updatedPass = new Utility();

    if (pass && pass.name) {
      updatedPass.nombreUtilidad = pass.name.trim();
    }
    if (pass && pass.value) {
      updatedPass.valorUtilidad = parseFloat(pass.value);
    }
    updatedPass.pkUtilidad = this.lastIdUpdated;
    console.log(updatedPass);
    this.utilityService.updatePass(this.lastIdUpdated, updatedPass).subscribe({
      next: (response) => {
        console.log('Actualizado Exitosamente');
        this.utilities[this.findIndexList(updatedPass)] = updatedPass;
        this.closeUpdateToggle();
        this.notify = 'actualización de utilidad';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'actualización de utilidad';
        this.deleteNotify();
      },
    });
  }

  findIndexList(utility: Utility): number {
    return this.utilities.findIndex(
      (sUtility) => sUtility.pkUtilidad === utility.pkUtilidad
    );
  }

  showDeleteForm(response: ResponseCRUD): void {
    this.toggleDel = response.toggle;
  }

  closeDeleteToggle(): void {
    this.toggleDel = false;
  }

  closeUpdateToggle(): void {
    this.toggleUpd = false;
  }
}
