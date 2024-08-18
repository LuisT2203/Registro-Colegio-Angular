import { Component, OnInit } from '@angular/core';
import { PersonalcolegioService } from '../../service/personalcolegio.service';
import { Ipersonalcolegio } from '../../model/iPersonalColegio';
import { PersonalColegio } from '../../model/personalcolegio';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
      (data:any)=>this.personales=data
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
        (resp) => {
          this.getPersonales();
          this.resetForm();
          this.toastr.success('Personal agregado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al agregar personal:', error);
          this.toastr.error('No se pudo agregar el personal. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
    } else {
      this.service.actualizarPC(this.personal).subscribe(
        (resp) => {
          this.getPersonales();
          this.resetForm();
          this.toastr.success('Personal actualizado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al actualizar personal:', error);
          this.toastr.error('No se pudo actualizar el personal. Por favor, inténtelo de nuevo.', 'Error');
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
            () => {
                this.getPersonales(); // Actualizar la lista después de eliminar
                this.toastr.info('Personal Eliminado con éxito', 'Eliminado');
            }
        );
    }
  }

}
