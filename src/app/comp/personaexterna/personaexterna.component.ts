import { Component, OnInit } from '@angular/core';
import { PersonaexternaService } from '../../service/personaexterna.service';
import { ToastrService } from 'ngx-toastr';
import { Ipersonaexterna } from '../../model/iPersonaExterna';
import { Personaexterna } from '../../model/personaexterna';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajeResponse } from '../../model/MensajeResponse';

@Component({
  selector: 'app-personaexterna',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor],
  templateUrl: './personaexterna.component.html',
  styleUrl: './personaexterna.component.css'
})
export class PersonaexternaComponent implements OnInit {

  constructor(private service:PersonaexternaService,
    private toastr: ToastrService){}

    personas : Ipersonaexterna[]=[];
    textoBoton ="Agregar";
    personaE = new Personaexterna();
    insUpd = true;

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(){
    this.service.getPES().subscribe(
      (data:any)=>{
        this.personas=data.object
      },
      error => {
        console.error('Error al obtener los padres', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  editar(pe: Ipersonaexterna) {
    this.textoBoton = "Actualizar";
    this.insUpd = false;
    this.service.getPE(pe.id_personaE).subscribe(
      (data: any) => {
        this.personaE = data;
        // Abre el modal programáticamente
      }
    );
  }

  agregar() {
    if (this.insUpd) {
      this.service.insertarPE(this.personaE).subscribe(
        (resp:MensajeResponse) => {
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPersonas();
          this.resetForm();
        },
        (error) => {
          console.error('Error al agregar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
    } else {
      this.service.actualizarPE(this.personaE).subscribe(
        (resp:MensajeResponse) => {
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPersonas();
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
    this.personaE = new Personaexterna();
    this.insUpd = true;
    this.textoBoton = "Agregar";
    // Cierra el modal programáticamente

  }

  eliminar(pe: Ipersonaexterna) {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
        this.service.eliminarPE(pe.id_personaE).subscribe(
            (resp :MensajeResponse) => {
              this.toastr.info(resp.mensaje, 'Eliminado');
                this.getPersonas(); // Actualizar la lista después de eliminar
            },
            (error) => {
              console.error('Error al Eliminar:', error);
              this.toastr.error(error.error, 'Error');
            }
        );
    }
  }


}
