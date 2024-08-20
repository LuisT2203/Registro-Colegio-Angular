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

  login(): void{
    this.authService.login(this.correo, this.clave).subscribe({
      next: ()=> this.router.navigate(['/inicio']),
      error: (err) => console.error('Login Fallido', err)
    })
  }




}
