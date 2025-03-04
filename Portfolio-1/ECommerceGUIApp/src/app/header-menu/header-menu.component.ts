import { Component } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  imports: [],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.css'
})
export class HeaderMenuComponent {
  logout() {
    console.log('Logout');
  }
}
