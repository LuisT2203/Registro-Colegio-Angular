import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IngresopersonaexternaService } from '../../service/ingresopersonaexterna.service';
import { PersonaexternaService } from '../../service/personaexterna.service';
import { ToastrService } from 'ngx-toastr';
import { Ipersonaexterna } from '../../model/iPersonaExterna';
import { IngresopersonaE } from '../../model/ingresopersonaE';
import { Personaexterna } from '../../model/personaexterna';
import { IingresopersonaE } from '../../model/iIngresoPersonaE';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MensajeResponse } from '../../model/MensajeResponse';


@Component({
  selector: 'app-ingreso-personaexterna',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor,NgSelectModule],
  templateUrl: './ingreso-personaexterna.component.html',
  styleUrl: './ingreso-personaexterna.component.css'
})
export class IngresoPersonaexternaComponent implements OnInit {



constructor(private service:IngresopersonaexternaService, private servicePE: PersonaexternaService,
    private toastr: ToastrService){}

    personas : Ipersonaexterna[]=[];
    textoBoton ="Agregar";
    ingreso = new IngresopersonaE();
    persona = new Personaexterna();
    insUpd = true;
    ingresos1: any[] = [];
    fechaBusqueda: string = '';
    idPersonaE: number | null = null;

  ngOnInit(): void {
    this.cargarIngresos();
    this.getPersonas();
    this.setCurrentTime();

  }



  setCurrentTime() {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5); // Obtiene la hora en formato HH:MM
    this.ingreso.hora_ingreso = timeString;
    this.ingreso.hora_salida = timeString;
  }


  cargarIngresos(): void {
    if (!this.fechaBusqueda && !this.idPersonaE) {
      // Obtener la fecha actual local en formato 'YYYY-MM-DD'
      const fechaLocal = new Date();
      const year = fechaLocal.getFullYear();
      const month = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
      const day = String(fechaLocal.getDate()).padStart(2, '0');
      this.fechaBusqueda = `${year}-${month}-${day}`;
  }
    this.service.listarIngresoPE(this.fechaBusqueda, this.idPersonaE || undefined)
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
    this.idPersonaE = null;
    this.cargarIngresos();
  }
  buscarPorId(): void {
    this.fechaBusqueda = '';
    this.cargarIngresos();
  }

  editar(ipe: IingresopersonaE) {
    this.textoBoton = "Actualizar";
    this.insUpd = false;
    this.service.getIPE(ipe.id_ingresoPersonaE).subscribe(
      (data: any) => {
        this.ingreso = data;

        const personalSeleccionado = this.personas
        .find(p => p.id_personaE === this.ingreso.personaE?.id_personaE);


        // Reasignar el valor correcto
        setTimeout(() => {
          this.ingreso.personaE = personalSeleccionado!;
        }, 0);
      }
    );
  }

  agregarIPE() {
    if (this.insUpd) {
      this.service.insertarIPE(this.ingreso).subscribe(
        (resp:MensajeResponse) => {
          this.cargarIngresos();
          this.resetForm();
          this.toastr.success(resp.mensaje, 'Éxito');
        },
        (error) => {
          console.error('Error al agregar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
    } else {
      this.service.actualizarIPE(this.ingreso).subscribe(
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
    this.ingreso = new IngresopersonaE();
    this.insUpd = true;
    this.textoBoton = "Agregar";
    this.setCurrentTime();
    // Cierra el modal programáticamente

  }

  eliminar(ipe: IingresopersonaE) {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
        this.service.eliminarIPE(ipe.id_ingresoPersonaE).subscribe(
            (resp :MensajeResponse) => {
              this.cargarIngresos(); // Actualizar la lista después de eliminar
              this.toastr.info(resp.mensaje, 'Eliminado');
            },
            (error) => {
              console.error('Error al Eliminar:', error);
              this.toastr.error(error.error, 'Error');
            }
        );
    }
  }

  agregarPE()  {
      this.servicePE.insertarPE(this.persona).subscribe(
        (resp:MensajeResponse) => {
          this.resetForm();
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPersonas();
        },
        (error) => {
          console.error('Error al agregar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
}

getPersonas(){
  this.servicePE.getPES().subscribe(
    (data:any)=>this.personas=data.object
  );
}
}
