import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLogedIn : boolean = false;

  isDarkMode = false;
  iconClass = 'bi bi-moon-stars';  // initial icon

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      this.iconClass = 'bi bi-brightness-high-fill';
    } else {
      document.body.classList.remove('dark-mode');
      this.iconClass = 'bi bi-moon-stars';
    }
  }
}
