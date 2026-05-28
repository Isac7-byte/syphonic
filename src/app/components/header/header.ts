import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartSidebarService } from '../../services/cart-sidebar.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  cartService        = inject(CartService);
  cartSidebarService = inject(CartSidebarService);

  openCart(): void {
    this.cartSidebarService.open();
  }
}
