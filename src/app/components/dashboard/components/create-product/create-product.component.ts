import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCategory, ProductPendingStatus } from '../../../../Interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../Services/product.service';
<<<<<<< HEAD
import { CommonModule, TitleCasePipe } from '@angular/common';
=======
import { TitleCasePipe } from '@angular/common';
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41

@Component({
  selector: 'app-create-product',
  standalone: true,
<<<<<<< HEAD
  imports: [ReactiveFormsModule,TitleCasePipe,CommonModule],
=======
  imports: [ReactiveFormsModule,TitleCasePipe],
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  form: FormGroup;
  categories = Object.values(ProductCategory);
  status = ProductPendingStatus;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      subCategoryName: [''],
      discountPrice: [0],
      techCompanyId: ['', Validators.required],
      category: [ProductCategory.Motherboard, Validators.required],
      statusSelect: [ProductPendingStatus.Pending],
      specifications: this.fb.array([]),
      warranties: this.fb.array([])
    });
  }

  get specifications(): FormArray {
    return this.form.get('specifications') as FormArray;
  }

  get warranties(): FormArray {
    return this.form.get('warranties') as FormArray;
  }

  addSpecification() {
    this.specifications.push(this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  removeSpecification(index: number) {
    this.specifications.removeAt(index);
  }

  addWarranty() {
    this.warranties.push(this.fb.group({
      durationInMonths: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    }));
  }

  removeWarranty(index: number) {
    this.warranties.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting = true;
    const {
      category,
      statusSelect,
      ...dto
    } = this.form.value;

    this.productService.addProduct(dto, category, statusSelect).subscribe({
      next: (res) => {
<<<<<<< HEAD
        console.log(res);
=======
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
        this.toastr.success(res.message);
        this.form.reset();
        this.specifications.clear();
        this.warranties.clear();
      },
      error: (err) => {
<<<<<<< HEAD
        console.log(err);
=======
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
        this.toastr.error(err.error?.message || 'Something went wrong');
      },
      complete: () => this.submitting = false
    });
  }
}
