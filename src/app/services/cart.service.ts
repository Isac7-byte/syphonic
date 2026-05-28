import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalQty = computed(() => this._items().reduce((s, i) => s + i.qty, 0));
  readonly totalPrice = computed(() => this._items().reduce((s, i) => s + i.price * i.qty, 0));

  addToCart(item: Omit<CartItem, 'qty'>, qty = 1): void {
    this._items.update(current => {
      const existing = current.find(c => c.id === item.id);
      if (existing) {
        return current.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c);
      }
      return [...current, { ...item, qty }];
    });
  }

  removeItem(id: number): void {
    this._items.update(current => current.filter(c => c.id !== id));
  }

  updateQty(id: number, delta: number): void {
    this._items.update(current => {
      return current
        .map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
        .filter(c => c.qty > 0);
    });
  }

  clear(): void {
    this._items.set([]);
  }
}
