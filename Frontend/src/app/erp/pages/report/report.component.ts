import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { reportRequest } from '../../models/orderHelper.model';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent {
  headers: string[] = [
    'idPedido',
    'idCliente',
    'nombre',
    'fecha',
    'descuento',
    'total',
    'abono',
    'estatus',
  ];
  elements: Order[] = [];
  toggleOpts: boolean[] = [];
  resume: string[] = [];
  showPrint: boolean = false;
  constructor(private orderService: OrderService) {}

  reportForm = new FormGroup({
    firstDate: new FormControl('', Validators.required),
    lastDate: new FormControl('', Validators.required),
  });

  /*print():void{
    const tabla = document.getElementById('contentTable');
  if (tabla) {
    const ventana = window.open('', '', 'width=600,height=600');
    ventana?.document.write('<html><head><title>Imprimir Tabla</title></head><body>');
    ventana?.document.write(tabla.outerHTML);
    ventana?.document.write('</body></html>');
    ventana?.document.close();
    ventana?.print();
  }}*/

  chargeData(): void {
    let dates = new reportRequest();
    let form = this.reportForm.value;

    if (form && form.firstDate) {
      dates.firstDate = form.firstDate;
    }
    if (form && form.lastDate) {
      dates.lastDate = form.lastDate;
    }
    console.log(dates);
    this.orderService.getReport(dates).subscribe({
      next: (data: any) => {
        this.resume[0] = '';
        this.resume[1] = '';
        this.resume[2] = '';
        this.resume[3] = '';
        this.elements = [];
        console.log(data);
        this.elements = data;
        this.resume[0] = dates.firstDate;
        this.resume[1] = dates.lastDate;
        this.resume[2] = this.elements.length.toString();
        let total = 0;
        for (let i = 0; i < this.elements.length; i++) {
          total += this.elements[i].total;
        }
        this.resume[3] = total.toString();
        this.showPrint = true;
      },
      error: (err) => {
        console.log(err);
        this.elements = [];
      },
    });
  }
}
