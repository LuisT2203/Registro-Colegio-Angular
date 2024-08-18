import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css'
})
export class NavegadorComponent {

  constructor(private authService: AuthService) {}

  isSidebarClosed = false;
  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      if (this.isSidebarClosed) {
        contentArea.classList.add('shrinked');
      } else {
        contentArea.classList.remove('shrinked');
      }
    }
  }

  toggleSubMenu(event: Event) {
    const target = event.target as HTMLElement;
    const parentLi = target.closest('.iocn-link')?.parentElement;
    if (parentLi) {
      parentLi.classList.toggle('showMenu');
      console.log('Toggled submenu'); // Para depuración
    }
  }

  logout() {
    this.authService.logout();
  }

}
