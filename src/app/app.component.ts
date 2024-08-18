import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavegadorComponent } from './comp/navegador/navegador.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavegadorComponent,RouterLink,ToastrModule,
    NgSelectModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  title = 'Registro Colegio';
}
