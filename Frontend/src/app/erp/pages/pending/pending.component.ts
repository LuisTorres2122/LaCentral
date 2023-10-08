import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html'
})
export class PendingComponent implements OnInit {
  headers: string[]=["idPedido","idCliente","nombre","fecha", "descuento", "total", "abono", "estatus" ];
  elements: Order [] = [];
  toggleOpts: boolean[] = [];
  lastElementUpdated: Order;
  toggleUpd: boolean = false;
  constructor(private orderService: OrderService){}
  ngOnInit(): void {
    this.chargeData();
  }

   formUpdate = new FormGroup({
    total: new FormControl({ value: '', disabled: true }, [Validators.required]),
    amount : new FormControl('', Validators.required)
   });

  chargeData(): void {
    this.orderService.getPendingOrder().subscribe((data: any) => {
      this.elements = data;
    });
  }
  updateOrder():void{
    let form = this.formUpdate.value;
    let updatedData = new Order();
    updatedData = this.lastElementUpdated;
    if(form && form.total){
      updatedData.total = parseFloat(form.total);
    }
    if(form && form.amount){
      updatedData.abono = parseFloat(form.amount);
      console.log(form.amount);
      console.log(form.total);
      if(form.amount == this.lastElementUpdated.total.toString()){
        updatedData.estatus = false;
      }else{
        updatedData.estatus = true;
      }
    }

    this.orderService.updatePendingorder(updatedData.idPedido,updatedData).subscribe({
      next: (res) => {
        console.log('Guardado exitosamente');
        this.toggleUpd = false;
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }
  
  findIndexList(element: any): number {
    return this.elements.findIndex(
      (el) => el.idPedido == element.idPedido
    );
  }

  transferData(element: any, index: number): void {
    this.toggleOpts[index] = false;
    const indextest = this.findIndexList(element);
    this.toggleUpd = true;
    this.formUpdate.patchValue({
      total : this.elements[indextest].total.toFixed(2)
    });
    this.lastElementUpdated = element;
  }

  
  switchToggleOptions(id: number): void {
    if (this.toggleOpts[id]) {
      this.toggleOpts[id] = false;
    } else {
      this.toggleOpts[id] = true;
    }
  }

  closeUpdateToggle(): void {
    this.toggleUpd = false;
  }
}
