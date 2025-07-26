import { Component, Input, Output } from '@angular/core';
import { WishListItemReadDTO } from '../../../../Interfaces/wishlist';
import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.css'
})
export class WishlistItemComponent {
  @Input() item!: WishListItemReadDTO;

}