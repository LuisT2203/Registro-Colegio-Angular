import { Component, OnInit } from '@angular/core';
import { PersonaexternaService } from '../../service/personaexterna.service';
import { ToastrService } from 'ngx-toastr';
import { Ipersonaexterna } from '../../model/iPersonaExterna';
import { Personaexterna } from '../../model/personaexterna';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      (data:any)=>this.personas=data
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
        (resp) => {
          this.getPersonas();
          this.resetForm();
          this.toastr.success('Persona Externa agregada con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al agregar Persona Externa:', error);
          this.toastr.error('No se pudo agregar la Persona Externa. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
    } else {
      this.service.actualizarPE(this.personaE).subscribe(
        (resp) => {
          this.getPersonas();
          this.resetForm();
          this.toastr.success('Persona Externa actualizado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al actualizar Persona Externa:', error);
          this.toastr.error('No se pudo actualizar la Persona Externa. Por favor, inténtelo de nuevo.', 'Error');
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
            () => {
                this.getPersonas(); // Actualizar la lista después de eliminar
                this.toastr.info('personaE Eliminado con éxito', 'Eliminado');
            }
        );
    }
  }


}
