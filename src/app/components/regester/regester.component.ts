import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-regester',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, NgClass],
  templateUrl: './regester.component.html',
  styleUrl: './regester.component.css'
})
export class RegesterComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  success: boolean = false;

  errMassage: string = "";
  isLoading: boolean = false;


  registerForm = this._FormBuilder.group({
    fullname: [null , [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: [null , [Validators.required, Validators.email]],
    address: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword: [null],
    phone: [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })
}
