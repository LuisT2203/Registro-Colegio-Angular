import { Component, OnInit } from '@angular/core';
import { PersonalcolegioService } from '../../service/personalcolegio.service';
import { Ipersonalcolegio } from '../../model/iPersonalColegio';
import { PersonalColegio } from '../../model/personalcolegio';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from '../../model/MensajeResponse';


@Component({
  selector: 'app-personalcolegio',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor],
  templateUrl: './personalcolegio.component.html',
  styleUrl: './personalcolegio.component.css'
})
export class PersonalcolegioComponent implements OnInit {

  constructor(private service:PersonalcolegioService,
    private toastr: ToastrService){}

  personales : Ipersonalcolegio[]=[];
  textoBoton ="Agregar";
  personal = new PersonalColegio();
  insUpd = true;


  ngOnInit(): void {
    this.getPersonales();
  }

  getPersonales(){
    this.service.getPCS().subscribe(
      (data:any)=>{
        this.personales=data?.object || [];
      },
      error => {
        console.error('Error al obtener los personales', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  editar(pc: Ipersonalcolegio) {
    this.textoBoton = "Actualizar";
    this.insUpd = false;
    this.service.getPC(pc.id_personal).subscribe(
      (data: any) => {
        this.personal = data;
        // Abre el modal programáticamente
      }
    );
  }

  agregar() {
    if (this.insUpd) {
      this.service.insertarPC(this.personal).subscribe(
        (resp: MensajeResponse) => {
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPersonales();
          this.resetForm();
        },
        (error) => {
          console.error('Error al agregar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
    } else {
      this.service.actualizarPC(this.personal).subscribe(
        (resp:MensajeResponse) => {
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPersonales();
          this.resetForm();

        },
        (error) => {
          console.error('Error al actualizar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
    }
  }

  resetForm() {
    this.personal = new PersonalColegio();
    this.insUpd = true;
    this.textoBoton = "Agregar";
    // Cierra el modal programáticamente

  }

  eliminar(pc: Ipersonalcolegio) {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
        this.service.eliminarPC(pc.id_personal).subscribe(
            (resp :MensajeResponse) => {
                this.getPersonales(); // Actualizar la lista después de eliminar
                this.toastr.info(resp.mensaje, 'Eliminado');
            },
            (error) => {
              console.error('Error al Eliminar:', error);
              this.toastr.error(error.error, 'Error');
            }
        );
    }
  }

}
