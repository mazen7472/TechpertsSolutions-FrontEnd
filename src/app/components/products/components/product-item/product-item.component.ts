import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../Interfaces/iproduct';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() productC! : IProduct
}
