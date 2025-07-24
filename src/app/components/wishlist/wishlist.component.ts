import { Component } from '@angular/core';
import { WishListReadDTO } from '../../Interfaces/wishlist';
import { WishlistService } from '../../Services/wishlist.service';
import { WishlistItemComponent } from "./components/wishlist-item/wishlist-item.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [WishlistItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
   wishlist?: WishListReadDTO;
  isLoading = true;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      this.isLoading = false;
      return;
    }

    this.wishlistService.getWishListByCustomerId(customerId).subscribe({
      next: (res) => {
        this.wishlist = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  removeItem(itemId: string) {
    // if (!this.wishlist) return;

    // this.wishlistService.removeItemFromWishList(this.wishlist.id, itemId).subscribe({
    //   next: () => {
    //     this.wishlist!.items = this.wishlist!.items.filter(item => item.id !== itemId);
    //   },
    //   error: (err) => {
    //     console.error('Failed to remove item:', err);
    //   }
    // });
  }
}
