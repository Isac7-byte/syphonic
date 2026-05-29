import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartSidebarService } from '../../services/cart-sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  cartService = inject(CartService);
  cartSidebarService = inject(CartSidebarService);
  authService = inject(AuthService);
  searchFocused = false;


  openCart(): void {
    this.cartSidebarService.open();
  }
}
