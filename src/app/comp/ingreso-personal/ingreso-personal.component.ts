import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngresopersonalService } from '../../service/ingresopersonal.service';
import { ToastrService } from 'ngx-toastr';
import { Iingresopersonal } from '../../model/iIngresoPersonal';
import { Ingresopersonal } from '../../model/ingresopersonal';
import { PersonalColegio } from '../../model/personalcolegio';
import { PersonalcolegioService } from '../../service/personalcolegio.service';
import { Ipersonalcolegio } from '../../model/iPersonalColegio';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-ingreso-personal',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor,NgSelectModule],
  templateUrl: './ingreso-personal.component.html',
  styleUrl: './ingreso-personal.component.css'
})
export class IngresoPersonalComponent implements OnInit {

  constructor(private service:IngresopersonalService, private servicePC: PersonalcolegioService,
    private toastr: ToastrService){}


    personales : Ipersonalcolegio[]=[];
    textoBoton ="Agregar";
    ingreso = new Ingresopersonal();
    personal = new PersonalColegio();
    insUpd = true;
    ingresos1: any[] = [];
    fechaBusqueda: string = '';
    idPersonal: number | null = null;

  ngOnInit(): void {

    this.cargarIngresos();
    this.getPersonales();
    this.setCurrentTime();


  }
  setCurrentTime() {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5); // Obtiene la hora en formato HH:MM
    this.ingreso.hora_ingreso = timeString;
    this.ingreso.hora_salida = timeString;
  }


  cargarIngresos(): void {
    this.service.listarIngresoPC(this.fechaBusqueda, this.idPersonal || undefined)
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
    this.idPersonal = null;
    this.cargarIngresos();
  }
  buscarPorId(): void {
    this.fechaBusqueda = '';
    this.cargarIngresos();
  }

  editar(ipc: Iingresopersonal) {
    this.textoBoton = "Actualizar";
    this.insUpd = false;
    this.service.getIPC(ipc.id_ingresoPersonal).subscribe(
      (data: any) => {
        this.ingreso = data;
        // Abre el modal programáticamente
      }
    );
  }

  agregarIPC() {
    if (this.insUpd) {
      this.service.insertarIPC(this.ingreso).subscribe(
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
      this.service.actualizarIPC(this.ingreso).subscribe(
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
    this.ingreso = new Ingresopersonal();
    this.insUpd = true;
    this.textoBoton = "Agregar";
    this.setCurrentTime();
    // Cierra el modal programáticamente

  }

  eliminar(ipc: Iingresopersonal) {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
        this.service.eliminarIPC(ipc.id_ingresoPersonal).subscribe(
            () => {
              this.cargarIngresos(); // Actualizar la lista después de eliminar
                this.toastr.info('Ingreso Eliminado con éxito', 'Eliminado');
            }
        );
    }
  }

  agregarPC()  {
      this.servicePC.insertarPC(this.personal).subscribe(
        (resp) => {
          this.resetForm();
          this.toastr.success('Personal agregado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al agregar personal:', error);
          this.toastr.error('No se pudo agregar el personal. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
}

getPersonales(){
  this.servicePC.getPCS().subscribe(
    (data:any)=>this.personales=data
  );
}

}
