import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishListItemReadDTO } from '../../Interfaces/wishlist';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistItemComponent } from './components/wishlist-item/wishlist-item.component';




@Component({
  selector: 'app-wishlist',
  standalone: true,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [WishlistItemComponent]
})
export class WishlistComponent implements OnInit {

  wishList: WishListItemReadDTO[] = [];

  constructor(
    private _wishList: WishlistService,
    private _router: Router,
    private _cartService: CartService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  private loadWishlist() {
    this._wishList.getLoggedWishList().subscribe({
      next: (res) => {
        this.wishList = res.data?.items || [];
        console.log('Wishlist:', this.wishList);
      },
      error: (err) => console.error('Error loading wishlist:', err)
    });
  }

  removeItem(productId: string) {
    this._wishList.removeWishedItem(productId).subscribe({
      next: () => {
        this._toastr.error('Item has been removed', 'Remove', { timeOut: 2000 });
        this.loadWishlist();
        // refresh wishlist count
        this._wishList.initializeWishlistState();
      },
      error: (err) => console.error('Error removing item:', err)
    });
  }

  addToCart(id: string) {
 
    this._cartService.addItem({ productId: id, quantity: 1 }).subscribe({
      next: () => {
        this._toastr.success('Item has been added', 'Success', { timeOut: 1000 });

     
        this._cartService.initializeCartState();
      },
      error: (err) => console.error('Error adding to cart:', err)
    });
  }
}