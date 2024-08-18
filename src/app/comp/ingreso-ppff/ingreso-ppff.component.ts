import { Component, OnInit } from '@angular/core';
import { IngresoppffService } from '../../service/ingresoppff.service';
import { PpffService } from '../../service/ppff.service';
import { ToastrService } from 'ngx-toastr';
import { Ippff } from '../../model/iPPFF';
import { Ingresoppff } from '../../model/ingresoppff';
import { Ppff } from '../../model/ppff';
import { Iingresoppff } from '../../model/iIngresoPPFF';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-ingreso-ppff',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor,NgSelectModule],
  templateUrl: './ingreso-ppff.component.html',
  styleUrl: './ingreso-ppff.component.css'
})
export class IngresoPpffComponent implements OnInit {

  constructor(private service:IngresoppffService, private servicePF: PpffService,
    private toastr: ToastrService){}


    padres : Ippff[]=[];
    textoBoton ="Agregar";
    ingreso = new Ingresoppff();
    padre = new Ppff();
    insUpd = true;
    ingresos1: any[] = [];
    fechaBusqueda: string = '';
    idPadre: number | null = null;

  ngOnInit(): void {
    this.cargarIngresos();
    this.getPadres();
    this.setCurrentTime();
  }

  setCurrentTime() {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5); // Obtiene la hora en formato HH:MM
    this.ingreso.hora_ingreso = timeString;
    this.ingreso.hora_salida = timeString;
  }


  cargarIngresos(): void {
    this.service.listarIngresoPF(this.fechaBusqueda, this.idPadre || undefined)
      .subscribe(
        (data: any) => {
          this.ingresos1 = data;
        },
        (error: Error) => {
          console.error('Error al cargar los ingresos:', error);
        }
      );
  }
  buscarPorFecha(): void {
    this.idPadre = null;
    this.cargarIngresos();
  }
  buscarPorId(): void {
    this.fechaBusqueda = '';
    this.cargarIngresos();
  }

  editar(ipf: Iingresoppff) {
    this.textoBoton = "Actualizar";
    this.insUpd = false;
    this.service.getIPF(ipf.id_ingresoPPFF).subscribe(
      (data: any) => {
        this.ingreso = data;
        // Abre el modal programáticamente
      }
    );
  }

  agregarIPF() {
    if (this.insUpd) {
      this.service.insertarIPF(this.ingreso).subscribe(
        (resp) => {
          this.cargarIngresos();
          this.resetForm();
          this.toastr.success('Ingreso agregado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al agregar Ingreso:', error);
          this.toastr.error('No se pudo agregar el Ingreso. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
    } else {
      this.service.actualizarIPF(this.ingreso).subscribe(
        (resp) => {
          this.cargarIngresos();
          this.resetForm();
          this.toastr.success('Ingreso actualizado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al actualizar Ingreso:', error);
          this.toastr.error('No se pudo actualizar el Ingreso. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
    }
  }

  resetForm() {
    this.ingreso = new Ingresoppff();
    this.insUpd = true;
    this.textoBoton = "Agregar";
    this.setCurrentTime();
    // Cierra el modal programáticamente

  }

  eliminar(ipf: Iingresoppff) {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
        this.service.eliminarIPF(ipf.id_ingresoPPFF).subscribe(
            () => {
              this.cargarIngresos(); // Actualizar la lista después de eliminar
                this.toastr.info('Ingreso Eliminado con éxito', 'Eliminado');
            }
        );
    }
  }

  agregarPF()  {
      this.servicePF.insertarPPFF(this.padre).subscribe(
        (resp) => {
          this.resetForm();
          this.toastr.success('Padre agregado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al agregar Padre:', error);
          this.toastr.error('No se pudo agregar el Padre. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
}

getPadres(){
  this.servicePF.getPPFFS().subscribe(
    (data:any)=>this.padres=data
  );
}

}
