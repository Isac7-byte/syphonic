import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-ingressos',
  standalone: true,
  imports: [ProductCard, RouterLink],
  templateUrl: './ingressos.html',
  styleUrl: './ingressos.css'
})
export class Ingressos implements OnInit {
  private productSvc = inject(ProductService);

  ingressos = signal<Product[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.productSvc.getByCategoria('ingresso').subscribe({
      next: (produtos) => {
        this.ingressos.set(produtos);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
