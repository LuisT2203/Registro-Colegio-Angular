import { Component, OnInit } from '@angular/core';
import { PpffService } from '../../service/ppff.service';
import { ToastrService } from 'ngx-toastr';
import { Ippff } from '../../model/iPPFF';
import { Ppff } from '../../model/ppff';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajeResponse } from '../../model/MensajeResponse';

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
      (data:any)=>{
        this.ppffs=data?.object || [];
      },
      error => {
        console.error('Error al obtener los padres', error);
        this.toastr.error(error.error, 'Error');
      }
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
        (resp:MensajeResponse) => {
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPpffs();
          this.resetForm();
        },
        (error) => {
          console.error('Error al agregar:', error);
          this.toastr.error(error.error, 'Error');
        }
      );
    } else {
      this.service.actualizarPPFF(this.ppff).subscribe(
        (resp:MensajeResponse) => {
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getPpffs();
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
    this.ppff = new Ppff();
    this.insUpd = true;
    this.textoBoton = "Agregar";
    // Cierra el modal programáticamente

  }

  eliminar(pf: Ippff) {
    if (confirm("¿Estás seguro de eliminar este padre de familia?")) {
        this.service.eliminarPPFF(pf.id_ppff).subscribe(
            (resp :MensajeResponse) => {
                this.toastr.info(resp.mensaje, 'Eliminado');
                this.getPpffs(); // Actualizar la lista después de eliminar
            },
            (error) => {
              console.error('Error al Eliminar:', error);
              this.toastr.error(error.error, 'Error');
            }
        );
    }
  }

}
