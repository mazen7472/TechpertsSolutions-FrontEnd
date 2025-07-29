<<<<<<< HEAD
import { NgClass, NgIf } from '@angular/common';
=======
import { NgClass } from '@angular/common';
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regester',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink,ReactiveFormsModule,NgIf],
=======
  imports: [RouterLink,ReactiveFormsModule],
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 private readonly _FormBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService)

  success: boolean = false;

  errMassage: string = "";
  isLoading: boolean = false;


  registerForm = this._FormBuilder.group({
<<<<<<< HEAD
  fullName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  userName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  email: [null, [Validators.required, Validators.email]],
  address: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
  password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
  confirmPassword: [null, [Validators.required]],
  phoneNumber: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  role: [null, [Validators.required]]
}, { validators: this.confirmPassword });

ngOnInit() {
  this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
    this.registerForm.updateValueAndValidity();
  });
}


=======
  FullName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  UserName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  Email: [null, [Validators.required, Validators.email]],
  Address: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
  Password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
  ConfirmPassword: [null, [Validators.required]],
  PhoneNumber: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
}, { validators: this.confirmPassword });

>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41


    registSub !: Subscription

  registerSubmit(): void {
    if(this.registerForm.valid){

      this.isLoading = true;

       this.registSub = this._authService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res)=>{

          console.log(res);

          if(res.success){
            this.success = true;
            setTimeout(() => {
              this._router.navigate(['/login'])
            }, 1000);
          }

          this.isLoading = false;
        },
        error: (err:HttpErrorResponse)=>{
          this.errMassage=err.error.message
          console.log(err);
          this.isLoading = false;
          
        }
      })

      
    } else {
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.registSub?.unsubscribe();
  }


<<<<<<< HEAD
  confirmPassword(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;

  return password === confirm ? null : { mismatch: true };
}


=======
  confirmPassword(g: AbstractControl) {
  return g.get('Password')?.value === g.get('ConfirmPassword')?.value ? null : { mismatch: true };
}

>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
}
