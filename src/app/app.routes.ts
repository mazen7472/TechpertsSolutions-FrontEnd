import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegesterComponent } from './components/regester/regester.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full' },
    { path:'home',component: HomeComponent,title: 'Home Page' },
    { path:'blog',component: BlogComponent,title: 'Blog Page' },
    { path:'about',component: AboutComponent,title: 'About Page' },
    { path:'products',component: ProductsComponent,title: 'Products Page' },
    { path:'contact',component: ContactComponent,title: 'Contact Page' },
    { path:'login',component: LogInComponent,title: 'LogIn Page' },
    { path:'regester',component: RegesterComponent,title: 'Regester Page' }
];
