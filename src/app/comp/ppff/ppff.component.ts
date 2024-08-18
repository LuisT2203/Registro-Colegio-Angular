import { Component, OnInit } from '@angular/core';
import { PpffService } from '../../service/ppff.service';
import { ToastrService } from 'ngx-toastr';
import { Ippff } from '../../model/iPPFF';
import { Ppff } from '../../model/ppff';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ppff',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor],
  templateUrl: './ppff.component.html',
  styleUrl: './ppff.component.css'
})
export class PpffComponent implements OnInit {

  constructor(private service:PpffService,
    private toastr: ToastrService){}

  ppffs : Ippff[]=[];
  textoBoton ="Agregar";
  ppff = new Ppff();
  insUpd = true;


  ngOnInit(): void {
    this.getPpffs();
  }

  getPpffs(){
    this.service.getPPFFS().subscribe(
      (data:any)=>this.ppffs=data
    );
  }
  editar(pf: Ippff) {
    this.textoBoton = "Actualizar";
    this.insUpd = false;
    this.service.getPPFF(pf.id_ppff).subscribe(
      (data: any) => {
        this.ppff = data;
        // Abre el modal programáticamente
      }
    );
  }

  agregar() {
    if (this.insUpd) {
      this.service.insertarPPFF(this.ppff).subscribe(
        (resp) => {
          this.getPpffs();
          this.resetForm();
          this.toastr.success('ppff agregado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al agregar ppff:', error);
          this.toastr.error('No se pudo agregar el ppff. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
    } else {
      this.service.actualizarPPFF(this.ppff).subscribe(
        (resp) => {
          this.getPpffs();
          this.resetForm();
          this.toastr.success('ppff actualizado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Error al actualizar ppff:', error);
          this.toastr.error('No se pudo actualizar el ppff. Por favor, inténtelo de nuevo.', 'Error');
        }
      );
    }
  }

  resetForm() {
    this.ppff = new Ppff();
    this.insUpd = true;
    this.textoBoton = "Agregar";
    // Cierra el modal programáticamente

  }

  eliminar(pf: Ippff) {
    if (confirm("¿Estás seguro de eliminar este padre de familia?")) {
        this.service.eliminarPPFF(pf.id_ppff).subscribe(
            () => {
                this.getPpffs(); // Actualizar la lista después de eliminar
                this.toastr.info('ppff Eliminado con éxito', 'Eliminado');
            }
        );
    }
  }

}
