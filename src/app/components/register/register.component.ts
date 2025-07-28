import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regester',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
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


  confirmPassword(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;

  return password === confirm ? null : { mismatch: true };
}


}
