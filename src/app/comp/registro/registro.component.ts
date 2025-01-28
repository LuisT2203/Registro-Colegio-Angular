import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../model/Usuario';
import { MensajeResponse } from '../../model/MensajeResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,
    FormsModule,HttpClientModule,NgFor],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  CustomerArray : any[]=[];
  isResultLoaded=false;
  isUpdateFormActive=false;

  usuario = new Usuario();

  constructor( private service : UsuarioService,
      private toastr: ToastrService) {}

 save() {
    this.service.registrarUsuario(this.usuario).subscribe(
      (resp:MensajeResponse)=>{
        this.toastr.success(resp.mensaje, 'Éxito');
      },
      (error) => {
        console.error('Error al agregar:', error);
        this.toastr.error(error.error, 'Error');
      }
    )
  }


}
