import { Component } from '@angular/core';
import { Usuario, UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,
    FormsModule,HttpClientModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  CustomerArray : any[]=[];
  isResultLoaded=false;
  isUpdateFormActive=false;

  correo: string ="";
  tipo : string ="";
  clave: string ="";

  constructor(private http: HttpClient) {}

 save(){

  let bodyData={
    "correo" : this.correo,
    "tipo" : this.tipo,
    "clave" :this.clave
  };
  this.http.post("https://registro-colegio.onrender.com/api/usuario/save",bodyData,{responseType:'text'}).subscribe((resultData:any)=>
    {
      console.log(resultData);
      alert("Usuario Registrado con Exito");
    });

 }


}
