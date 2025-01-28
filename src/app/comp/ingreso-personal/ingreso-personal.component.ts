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
import { MensajeResponse } from '../../model/MensajeResponse';

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
            (data: MensajeResponse) => {
              if (data && data.object) { // Validación de que data y data.object existen
                this.ingresos1 = data.object;

                if (this.ingresos1.length === 0) {
                  // Mostrar mensaje si no hay registros tras el filtro
                  this.toastr.info(data.mensaje, 'Información');
              }
            } else {
              // Manejar el caso en que no se encontró ningún dato
              this.toastr.info(data.mensaje, 'Información');
              this.ingresos1 = []; // Asegurarse de que ingresos1 esté vacío
          }
        },
            error => {
              console.error('Error al obtener los padres', error);
              this.toastr.error(error.error, 'Error');
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
         // Encuentra la persona correspondiente en la lista de personales
         //No cargaba el select al presionar editar
         // Busca en la lista de personales (`this.personales`) el objeto que tenga un `id_personal` igual al `id_personal` del objeto asociado al ingreso (`this.ingreso.personal`).
        // Este proceso es realizado mediante el método `find` que devuelve el primer objeto que cumple con la condición especificada.

        const personalSeleccionado = this.personales
        .find(p => p.id_personal === this.ingreso.personal?.id_personal);


        // Reasignar el valor correcto
        setTimeout(() => {
          this.ingreso.personal = personalSeleccionado!;
        }, 0);
      }
    );
  }

  agregarIPC() {
    if (this.insUpd) {
      this.service.insertarIPC(this.ingreso).subscribe(
        (resp:MensajeResponse) => {
          this.toastr.success(resp.mensaje, 'Éxito');
          this.cargarIngresos();
          this.resetForm();
        },
        (error) => {
          console.error('Error al agregar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
    } else {
      this.service.actualizarIPC(this.ingreso).subscribe(
        (resp:MensajeResponse) => {
          this.cargarIngresos();
          this.resetForm();
          this.toastr.success(resp.mensaje, 'Éxito');
        },
        (error) => {
          console.error('Error al actualizar:', error);
          this.toastr.error(error.error, 'Error');
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
            (resp :MensajeResponse) => {
              this.cargarIngresos(); // Actualizar la lista después de eliminar
              this.toastr.info(resp.mensaje, 'Eliminado');
            }
        );
    }
  }

  agregarPC()  {
      this.servicePC.insertarPC(this.personal).subscribe(
        (resp:MensajeResponse) => {
          this.resetForm();
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPersonales();
        },
        (error) => {
          console.error('Error al agregar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
}

getPersonales(){
  this.servicePC.getPCS().subscribe(
    (data:any)=>this.personales=data.object
  );
}
descargarPdf(id_personal: number) {
  console.log('ID Personal recibido:', id_personal);
  if (!id_personal) {
    console.error('ID Personal no definido');
    return;
  }
  this.service.exportPdfById(id_personal).subscribe((data: Blob) => {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ReportePersonal_${id_personal}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

}
