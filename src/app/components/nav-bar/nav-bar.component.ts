import { CartService } from './../../Services/cart.service';
import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

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
  userName : string | null = null;
  cartCount = 0;


  private _platformId = inject(PLATFORM_ID);
  private _isBrowser = isPlatformBrowser(this._platformId);
  public _authService = inject(AuthService)

  constructor(private cartService: CartService) {}

 ngOnInit(): void {
  this.cartService.initializeCartState();
  this.cartItemCount$ = this.cartService.itemCount$;
  this.cartTotalPrice$ = this.cartService.totalPrice$;
  this.animateCart$ = this.cartService.animateCart$;

  if (this._isBrowser) {
    this._authService.isLoggedIn$.subscribe((status) => {
      this.isLogedIn = status;
      this.userName = localStorage.getItem('userName');
    });

    this.cartService.getCart().subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }
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