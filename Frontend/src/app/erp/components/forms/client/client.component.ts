import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { find } from 'rxjs';
import { Client } from 'src/app/erp/models/client.model';
import { ResponseCRUD } from 'src/app/erp/models/responseCRUD.model';
import { ClientService } from 'src/app/erp/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  header: string[] = ['Id', 'Nombre', 'Email', 'Telefono', 'Dirección', '']; 
  title: string = "Clientes";
  notify: string= "";
  badNotify: string = '';
  clients: Client[] = [];
  toggleForm: boolean = false;
  toggleUpd: boolean = false;
  toggleDel: boolean = false;
  lastIdUpdated: number;
  lastIdDeleted: number;
  lastIdDeletedIndex: number;
  elementsClient: string[] = [
    'pkIdCliente',
    'nombreCliente',
    'emailCliente',
    'telefonoCliente',
    'direccionCliente',
  ];

  constructor(private clientService: ClientService) {}

  deleteNotify() {
    setTimeout(() => {
      this.notify = "";
      this.badNotify = '';
    }, 3000);
  }

  formClientCreate = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email, Validators.maxLength(25)]),
    phone: new FormControl('', Validators.minLength(8)),
    address: new FormControl('', Validators.maxLength(50)),
  });

  formClientUpdate = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email, Validators.maxLength(25)]),
    phone: new FormControl('', Validators.minLength(8)),
    address: new FormControl('', Validators.maxLength(50)),
  });
  ngOnInit(): void {
    this.chargeClients();
  }

  recieveToggle(toggle: boolean): void {
    this.toggleForm = true;
  }

  chargeClients(): void {
    this.clientService.getData().subscribe((data: any) => {
      this.clients = data;
    });
  }
  closeToggleCreate(): void {
    this.toggleForm = false;
    this.clearInputs();
  }

  addClient(): void {
    var client = this.formClientCreate.value;
    var newClient = new Client();
    if (client && client.name) {
      newClient.nombreCliente = client.name;
    }
    if (client && client.email) {
      newClient.emailCliente = client.email;
    }
    if (client && client.phone) {
      newClient.telefonoCliente = parseInt(client.phone);
    }
    if (client && client.address) {
      newClient.direccionCliente = client.address;
    }
    this.clientService.createClient(newClient).subscribe({
      next:(response) => {
        console.log('Creado Exitosamente');
        const lastElement = this.clients[this.clients.length - 1];
        newClient.pkIdCliente = lastElement.pkIdCliente + 1;
        this.clients.push(newClient);
        this.notify = "creación de cliente";
        this.deleteNotify();
      },
      error:(err) => {
        console.log(err);
        this.badNotify = "creación de cliente";
          this.deleteNotify();
      }
    }
    );
    this.clearInputs();
  }

  transferData(response: ResponseCRUD): void {
    this.toggleUpd = response.toggle;
    this.formClientUpdate.patchValue({
      name: response.element.nombreCliente,
      email: response.element.emailCliente,
      phone: response.element.telefonoCliente?.toString(),
      address: response.element.direccionCliente,
    });

    this.lastIdUpdated = response.id;
  }

  updateClient(): void {
    var client = this.formClientUpdate.value;

    var updatedClient = new Client();
    if (client && client.name) {
      updatedClient.nombreCliente = client.name;
    }
    if (client && client.email) {
      updatedClient.emailCliente = client.email;
    }
    if (client && client.phone) {
      updatedClient.telefonoCliente = parseInt(client.phone);
    }
    if (client && client.address) {
      updatedClient.direccionCliente = client.address;
    }
    updatedClient.pkIdCliente = this.lastIdUpdated;
    this.clientService
      .updateClient(this.lastIdUpdated, updatedClient)
      .subscribe({
       next: (response) => {
          console.log('Actualizado Exitosamente');

          this.clients[this.findIndexList(updatedClient)] = updatedClient;

          this.closeUpdateToggle();
          this.notify = "actualización de cliente";
          this.deleteNotify();
        },
       error: (err) => {
          console.log(err);
          this.badNotify = "actualización de cliente";
          this.deleteNotify();
        }
      }
      );
  }
  findIndexList(client: Client): number {
    return this.clients.findIndex(
      (sClient) => sClient.pkIdCliente === client.pkIdCliente
    );
  }

  showDeleteForm(response: ResponseCRUD): void {
    this.toggleDel = response.toggle;
    this.lastIdDeleted = response.id;
    this.lastIdDeletedIndex  = this.findIndexList(response.element);

  }

  deleteClient(): void {

    this.clientService
      .deleteClient(this.lastIdDeleted)
      .subscribe({
        next: (response) => {
          console.log('Eliminado Exitosamente');
         
          this.notify = "eliminación de cliente";
          this.clients.splice(this.lastIdDeletedIndex, 1);
          this.deleteNotify();
          this.toggleDel = false;
        },
        error: (err) => {
          console.log(err);
          this.badNotify = "eliminación de cliente";
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
    this.formClientCreate.reset();
  }

 
 
}
