import { Component, inject, signal, effect } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-modal',
  imports: [CurrencyPipe],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModal {
  modalService = inject(ModalService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  product = this.modalService.product;
  qty = signal(1);

  constructor() {
    // Reset qty whenever modal opens with a new product
    effect(() => {
      if (this.product()) {
        this.qty.set(1);
      }
    });
  }

  incQty(): void { this.qty.update(v => v + 1); }
  decQty(): void { this.qty.update(v => v > 1 ? v - 1 : 1); }

  close(): void {
    this.modalService.close();
    this.qty.set(1);
  }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cartService.addToCart({ id: p.id, name: p.nome, price: p.preco, img: p.imagem }, this.qty());
    this.toastService.show('✅ Produto adicionado ao carrinho!');
    this.close();
  }
}
