import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Piece } from 'src/app/erp/models/piece.model';
import { ResponseCRUD } from 'src/app/erp/models/responseCRUD.model';
import { PieceService } from 'src/app/erp/services/piece.service';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
})
export class PieceComponent {
  header: string[] = [
    'Id',
    'Titulo',
    'Autor',
    'Tecnica',
    'Medida',
    'Precio',
    'Fecha',
    'Posicion',
    'Importancia',
    '',
  ];
  isReadingFile: boolean = false;
  title: string = 'Obra';
  notify: string = '';
  badNotify: string = '';
  pieces: Piece[] = [];
  toggleForm: boolean = false;
  toggleUpd: boolean = false;
  toggleDel: boolean = false;
  toggleView: boolean = false;
  lastIdUpdated: number;
  lastIdDeleted: number;
  lastIdDeletedIndex: number;
  showImage: any;
  private fileReader: FileReader = new FileReader();
  private fileReader2: FileReader = new FileReader();
  emptyImage: boolean = true;
  position: boolean = true;
  image64: any;
  dataImage: string[] = [];
  elementsPieces: string[] = [
    'pkIdObra',
    'tituloObra',
    'autorObra',
    'tecnicaObra',
    'medidaObra',
    'precioObra',
    'fechaPublicacionObra',
    'posicionObra',
    'importanciaObra',
  ];

  constructor(
    private pieceService: PieceService,
    private titleService: Title
  ) {}

  deleteNotify() {
    setTimeout(() => {
      this.notify = '';
      this.badNotify = '';
    }, 3000);
  }

  dateWithOutHour(): Date {
    const fecha = new Date();
    fecha.setHours(0, 0, 0, 0);
    return fecha;
  }

  formPieceCreate = new FormGroup({
    nameTitle: new FormControl('', Validators.maxLength(50)),
    author: new FormControl('', Validators.maxLength(25)),
    technique: new FormControl('', Validators.maxLength(50)),
    measure: new FormControl('', Validators.maxLength(15)),
    price: new FormControl(''),
    url: new FormControl('', Validators.required),
    dateC: new FormControl(this.dateWithOutHour(), Validators.required),
    position: new FormControl(true, Validators.required),
    importance: new FormControl('', Validators.required),
  });

  formPieceUpdate = new FormGroup({
    nameTitle: new FormControl('', Validators.maxLength(50)),
    author: new FormControl('', Validators.maxLength(25)),
    technique: new FormControl('', Validators.maxLength(50)),
    measure: new FormControl('', Validators.maxLength(15)),
    price: new FormControl(''),
    url: new FormControl('', Validators.required),
    dateC: new FormControl(this.dateWithOutHour(), Validators.required),
    position: new FormControl(true, Validators.required),
    importance: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.chargeClients();
    this.titleService.setTitle('Obras');
  }

  recieveToggle(toggle: boolean): void {
    this.toggleForm = true;
  }

  recieveView(response: ResponseCRUD): void {
    this.toggleView = response.toggle;
    this.showImage = response.element.urlObra;
    this.dataImage[0] =
      'Titulo: ' +
      (!response.element.tituloObra ? ' ' : response.element.tituloObra);
    this.dataImage[1] =
      'Autor: ' +
      (!response.element.autorObra ? ' ' : response.element.autorObra);
    this.dataImage[2] =
      'Tecnica: ' +
      (!response.element.tecnicaObra ? ' ' : response.element.tecnicaObra);
    this.dataImage[3] =
      'Medida: ' +
      (!response.element.medidaObra ? ' ' : response.element.medidaObra);
    this.dataImage[4] =
      'Precio: ' +
      (!response.element.precioObra ? ' ' : 'Q' + response.element.precioObra);
  }

  closeToggleView() {
    this.toggleView = false;
  }

  chargeClients(): void {
    this.pieceService.getData().subscribe((data: any) => {
      this.pieces = data;
    });
  }
  closeToggleCreate(): void {
    this.toggleForm = false;
    this.clearInputs();
  }

  updateSelectedPosition(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.position = selectElement.value === 'true';
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];

    if (file) {
      if (this.fileReader.readyState === 2) {
        this.fileReader = new FileReader(); // Si está ocupado, crea uno nuevo
      }

      this.fileReader.onload = () => {
        const base64String = (this.fileReader.result as string).split(',')[1];
        this.image64 = base64String;
        console.log(this.image64);

        const urlControl = this.formPieceCreate.get('url');
        if (urlControl) {
          urlControl.setValue(base64String);
        } else {
          console.log("Control 'url' no encontrado en formPieceCreate.");
        }
      };

      this.image64 = this.fileReader.readAsDataURL(file);
      this.emptyImage = false;
    }
  }

  base64ToImage(base64: string) {
    return 'data:image/png;base64,' + base64;
  }

  addPiece(): void {
    var piece = this.formPieceCreate.value;
    var newPiece = new Piece();
    console.log(this.image64);
    if (piece && piece.nameTitle) {
      newPiece.tituloObra = piece.nameTitle;
    }
    if (piece && piece.author) {
      newPiece.autorObra = piece.author;
    }
    if (piece && piece.technique) {
      newPiece.tecnicaObra = piece.technique;
    }
    if (piece && piece.measure) {
      newPiece.medidaObra = piece.measure;
    }
    if (piece && piece.price) {
      newPiece.precioObra = piece.price;
    }
    if (piece && piece.url) {
      newPiece.urlObra = this.image64;
    }
    if (piece && piece.dateC) {
      newPiece.fechaPublicacionObra = piece.dateC;
    }
    if (piece && piece.position != undefined) {
      newPiece.posicionObra = this.position;
    }
    if (piece && piece.importance) {
      newPiece.importanciaObra = parseInt(piece.importance);
    }

    if (this.pieces.length < 0) {
      newPiece.pkIdObra = 1;
    }

    this.pieceService.createPiece(newPiece).subscribe({
      next: (response) => {
        console.log('Creado Exitosamente');

        if (this.pieces.length > 0) {
          const lastElement = this.pieces[this.pieces.length - 1];
          newPiece.pkIdObra = lastElement.pkIdObra + 1;
        } else {
          newPiece.pkIdObra = 1;
        }

        this.pieces.push(newPiece);
        this.notify = 'creación de pieza';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'creación de pieza';
        this.deleteNotify();
      },
    });
    this.clearInputs();
  }

  transferData(response: ResponseCRUD): void {
    this.toggleUpd = response.toggle;
    this.formPieceUpdate.patchValue({
      nameTitle: response.element.tituloObra,
      author: response.element.autorObra,
      technique: response.element.tecnicaObra,
      measure: response.element.medidaObra,
      price: response.element.precioObra,
      url: response.element.urlObra,
      dateC: response.element.fechaPublicacionObra,
      position: response.element.posicionObra,
      importance: response.element.importanciaObra,
    });

    this.lastIdUpdated = response.id;
  }

  updatePiece(): void {
    var piece = this.formPieceUpdate.value;

    var updatedPiece = new Piece();
    if (piece && piece.nameTitle) {
      updatedPiece.tituloObra = piece.nameTitle;
    }
    if (piece && piece.author) {
      updatedPiece.autorObra = piece.author;
    }
    if (piece && piece.technique) {
      updatedPiece.tecnicaObra = piece.technique;
    }
    if (piece && piece.measure) {
      updatedPiece.medidaObra = piece.measure;
    }
    if (piece && piece.price) {
      updatedPiece.precioObra = piece.price;
    }
    if (piece && piece.url) {
      updatedPiece.urlObra = piece.url;
    }
    if (piece && piece.dateC) {
      updatedPiece.fechaPublicacionObra = piece.dateC;
    }
    if (piece && piece.position) {
      updatedPiece.posicionObra = this.position;
    }
    if (piece && piece.importance) {
      updatedPiece.importanciaObra = parseInt(piece.importance);
    }
    updatedPiece.pkIdObra = this.lastIdUpdated;
    this.pieceService.updatePiece(this.lastIdUpdated, updatedPiece).subscribe({
      next: (response) => {
        console.log('Actualizado Exitosamente');

        this.pieces[this.findIndexList(updatedPiece)] = updatedPiece;

        this.closeUpdateToggle();
        this.notify = 'actualización de pieza';
        this.deleteNotify();
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'actualización de pieza';
        this.deleteNotify();
      },
    });
  }
  findIndexList(piece: Piece): number {
    return this.pieces.findIndex(
      (sPiece) => sPiece.pkIdObra === piece.pkIdObra
    );
  }

  showDeleteForm(response: ResponseCRUD): void {
    this.toggleDel = response.toggle;
    this.lastIdDeleted = response.id;
    this.lastIdDeletedIndex = this.findIndexList(response.element);
  }

  deletePiece(): void {
    this.pieceService.deletePiece(this.lastIdDeleted).subscribe({
      next: (response) => {
        console.log('Eliminado Exitosamente');

        this.notify = 'eliminación de pieza';
        this.pieces.splice(this.lastIdDeletedIndex, 1);
        this.deleteNotify();
        this.toggleDel = false;
      },
      error: (err) => {
        console.log(err);
        this.badNotify = 'eliminación de pieza';
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
    this.formPieceCreate.reset();
  }
}
