import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../../models/order.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
})
export class PrintComponent implements OnInit {
  @Input() data: Transaction;
  @Output() show = new EventEmitter<boolean>();
  checkboxSeleccionado: string = '';

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Imprimir');
  }

  seleccionarCheckbox(checkbox: string): void {
    this.checkboxSeleccionado = checkbox;
    console.log(checkbox);
  }

  closeShow(): void {
    this.show.emit(false);
  }
}
