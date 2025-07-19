import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../../Interfaces/iproduct';
import { CartItem, CartService } from '../../../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() productC! : IProduct
  @Output() addToCart = new EventEmitter<string>();

onAddToCart() {
  this.addToCart.emit(this.productC.id);
}


  _cartService = inject(CartService)

  ngOnInit(): void {
    
  console.log(this.productC);
    
  }  


}
