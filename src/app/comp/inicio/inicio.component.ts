import { Component, OnInit } from '@angular/core';
import { IngresopersonalService } from '../../service/ingresopersonal.service';
import { IngresopersonaexternaService } from '../../service/ingresopersonaexterna.service';
import { IngresoppffService } from '../../service/ingresoppff.service';
import { EncargoService } from '../../service/encargo.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  constructor(private service:IngresopersonalService,private servicePE:IngresopersonaexternaService,
    private servicePF:IngresoppffService, private serviceEn: EncargoService
   ){}
  ngOnInit(): void {
    this.cargarIngresos();
    this.cargarIngresosPE();
    this.cargarIngresosPadres();
    this.cargarEncargos();
  }

  fechaBusqueda: string = '';
  idPersonal: number | null = null;
  idPersonaE: number | null = null;
  idPadre: number | null = null;
  encargoNom: string ='';
  ingresos1: any[] = [];
  ingresos2: any[] = [];
  ingresos3: any[] = [];
  encargos1:any[]=[];

  cargarIngresos(): void {
    if (!this.fechaBusqueda && !this.idPersonal) {
        // Obtener la fecha actual local en formato 'YYYY-MM-DD'
        const fechaLocal = new Date();
        const year = fechaLocal.getFullYear();
        const month = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const day = String(fechaLocal.getDate()).padStart(2, '0');
        this.fechaBusqueda = `${year}-${month}-${day}`;
    }

    this.service.listarIngresoPC(this.fechaBusqueda, this.idPersonal || undefined)
        .subscribe(
            (data: any) => {
                this.ingresos1 = data?.object || [];
            },
            (error: Error) => {
                console.error('Error al cargar los ingresos:', error);
            }
        );
}

cargarIngresosPE(): void {
  if (!this.fechaBusqueda && !this.idPersonaE) {
    // Obtener la fecha actual local en formato 'YYYY-MM-DD'
    const fechaLocal = new Date();
    const year = fechaLocal.getFullYear();
    const month = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(fechaLocal.getDate()).padStart(2, '0');
    this.fechaBusqueda = `${year}-${month}-${day}`;
}
  this.servicePE.listarIngresoPE(this.fechaBusqueda, this.idPersonaE || undefined)
    .subscribe(
      (data: any) => {
        this.ingresos2 = data?.object || [];
      },
      (error: Error) => {
        console.error('Error al cargar los ingresos:', error);
      }
    );
}

cargarIngresosPadres(): void {
  if (!this.fechaBusqueda && !this.idPadre) {
    // Obtener la fecha actual local en formato 'YYYY-MM-DD'
    const fechaLocal = new Date();
    const year = fechaLocal.getFullYear();
    const month = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(fechaLocal.getDate()).padStart(2, '0');
    this.fechaBusqueda = `${year}-${month}-${day}`;
}
  this.servicePF.listarIngresoPF(this.fechaBusqueda, this.idPadre || undefined)
    .subscribe(
      (data: any) => {
        this.ingresos3 = data?.object || [];
      },
      (error: Error) => {
        console.error('Error al cargar los ingresos:', error);
      }
    );
}
cargarEncargos(): void{
  if (!this.fechaBusqueda && !this.encargoNom) {
    // Obtener la fecha actual local en formato 'YYYY-MM-DD'
    const fechaLocal = new Date();
    const year = fechaLocal.getFullYear();
    const month = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(fechaLocal.getDate()).padStart(2, '0');
    this.fechaBusqueda = `${year}-${month}-${day}`;
}
  this.serviceEn.listarEncargos(this.fechaBusqueda, this.encargoNom || undefined)
    .subscribe(
      (data: any) => {
        this.encargos1 = data?.object || [];
      },
      (error: Error) => {
        console.error('Error al cargar los encargos:', error);
      }
    );
}

}
