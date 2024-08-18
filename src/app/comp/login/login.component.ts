import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string ="";
  clave: string ="";

  constructor(private http: HttpClient,private router: Router,private authService: AuthService) {}

  Login(){
    console.log(this.correo);
    console.log(this.clave);

    let bodyData = {
      correo:this.correo,
      clave:this.clave
    };
    this.http.post("https://registro-colegio.onrender.com/api/usuario/login",bodyData).subscribe((resultData: any)=>{
      console.log(resultData);

      if(resultData.message == "Email no Existe")
      {
        alert ("Email No Existe");
      }
      else if(resultData.message == "Login Succes")
        {
          this.authService.setLoggedIn(true);
          this.router.navigate(['/inicio']);
      }
      else
      {
        alert("Correo o Contraseña Incorrecto")
      }
    });






  }



}
