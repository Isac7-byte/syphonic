import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { CartSidebarService } from '../../services/cart-sidebar.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CurrencyPipe],
  templateUrl: './cart-sidebar.html',
  styleUrl: './cart-sidebar.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartSidebar {
  cartService     = inject(CartService);
  sidebarService  = inject(CartSidebarService);
  private toastService = inject(ToastService);

  checkoutOpen = false;
  checkoutSnapshot: CartItem[] = [];
  checkoutTotal = 0;

  close(): void { this.sidebarService.close(); }

  removeItem(id: number): void { this.cartService.removeItem(id); }

  updateQty(id: number, delta: number): void { this.cartService.updateQty(id, delta); }

  clearCart(): void { this.cartService.clear(); }

  checkout(): void {
    if (!this.cartService.items().length) return;
    this.checkoutSnapshot = [...this.cartService.items()];
    this.checkoutTotal = this.cartService.totalPrice();
    this.close();
    this.checkoutOpen = true;
  }

  closeCheckout(): void { this.checkoutOpen = false; }

  onCheckoutOverlay(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeCheckout();
    }
  }

  confirmPurchase(): void {
    this.checkoutOpen = false;
    this.cartService.clear();
    this.toastService.show('🎉 Compra realizada com sucesso! Obrigado pela preferência!', true);
  }
}
