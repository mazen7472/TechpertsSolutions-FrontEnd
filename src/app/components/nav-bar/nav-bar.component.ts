import { CartService } from './../../Services/cart.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogedIn = false;
  isDarkMode = false;
  scrolled = false;
  logo = 'assets/Images/logo.png';

  cartItemCount$!: Observable<number>;
  cartTotalPrice$!: Observable<number>;
  animateCart$!: Observable<boolean>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemCount$ = this.cartService.itemCount$;
    this.cartTotalPrice$ = this.cartService.totalPrice$;
    this.animateCart$ = this.cartService.animateCart$;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    document.body.classList.toggle('light-theme', !this.isDarkMode);
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  get navbarClasses(): Record<string, boolean> {
    return {
      'custom-navbar': true,
      'navbar-scrolled': this.scrolled,
      'dark-mode': this.isDarkMode,
    };
  }

  get linkClass(): string {
    return this.isDarkMode ? 'text-dark' : 'text-white';
  }

  get logoClass(): string {
    return this.isDarkMode ? 'text-dark' : 'text-white';
  }

  get themeIcon(): string {
    return this.isDarkMode ? 'bi-moon-fill' : 'bi-sun-fill';
  }
}