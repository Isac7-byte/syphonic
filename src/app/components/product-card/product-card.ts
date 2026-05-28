import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  private modalService = inject(ModalService);
  private cartService  = inject(CartService);
  private toastService = inject(ToastService);

  openModal(): void {
    this.modalService.open(this.product);
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart({
      id:    this.product.id,
      name:  this.product.nome,
      price: this.product.preco,
      img:   this.product.imagem
    });
    this.toastService.show('✅ Produto adicionado ao carrinho!');
  }
}
