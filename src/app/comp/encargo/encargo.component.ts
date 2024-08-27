import { Component, OnInit } from '@angular/core';
import { EncargoService } from '../../service/encargo.service';
import { ToastrService } from 'ngx-toastr';
import { Iencargo } from '../../model/iencargo';
import { Encargo } from '../../model/encargo';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encargo',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor],
  templateUrl: './encargo.component.html',
  styleUrl: './encargo.component.css'
})
export class EncargoComponent implements OnInit {

  constructor(private service:EncargoService,
    private toastr: ToastrService){}


    encargos : Iencargo[]=[];
    textoBoton ="Agregar";
    encargo= new Encargo();
    encargos1:any[]=[];
    insUpd = true;
    fechaBusqueda: string ='';
    encargoNom: string ='';

    ngOnInit(): void {
      this.cargarEncargos();
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
      this.service.listarEncargos(this.fechaBusqueda, this.encargoNom || undefined)
        .subscribe(
          (data: any) => {
            this.encargos1 = data;
          },
          (error: Error) => {
            console.error('Error al cargar los encargos:', error);
          }
        );
    }
    buscarPorFecha(): void {
      this.encargoNom = '';
      this.cargarEncargos();
    }
    buscarPorNombreE(): void {
      this.fechaBusqueda = '';
      this.cargarEncargos();
    }
    editar(enc: Iencargo) {
      this.textoBoton = "Actualizar";
      this.insUpd = false;
      this.service.getEnc(enc.id_enc).subscribe(
        (data: any) => {
          this.encargo = data;

        }
      );
    }
    agregarEnc() {
      if (this.insUpd) {
        this.service.insertarEnc(this.encargo).subscribe(
          (resp) => {
            this.cargarEncargos();
            this.resetForm();
            this.toastr.success('Encargo agregado con éxito', 'Éxito');
          },
          (error) => {
            console.error('Error al agregar Encargo:', error);
            this.toastr.error('No se pudo agregar el Encargo. Por favor, inténtelo de nuevo.', 'Error');
          }
        );
      } else {
        this.service.actualizarEnc(this.encargo).subscribe(
          (resp) => {
            this.cargarEncargos();
            this.resetForm();
            this.toastr.success('Encargo actualizado con éxito', 'Éxito');
          },
          (error) => {
            console.error('Error al actualizar Encargo:', error);
            this.toastr.error('No se pudo actualizar el Encargo. Por favor, inténtelo de nuevo.', 'Error');
          }
        );
      }
    }
    resetForm() {
      this.encargo = new Encargo();
      this.insUpd = true;
      this.textoBoton = "Agregar";

      // Cierra el modal programáticamente

    }
    eliminar(enc: Iencargo) {
      if (confirm("¿Estás seguro de eliminar este empleado?")) {
          this.service.eliminarEnc(enc.id_enc).subscribe(
              () => {
                this.cargarEncargos(); // Actualizar la lista después de eliminar
                  this.toastr.info('Encargo Eliminado con éxito', 'Eliminado');
              }
          );
      }
    }
}
