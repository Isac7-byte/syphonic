import { Component, inject, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private productService = inject(ProductService);

  promocaoSemanal: Product[] = [];
  instrumentosEstudio: Product[] = [];
  produtosIngresso: Product[] = [];
  produtosCordas: Product[] = [];
  produtosAudio: Product[] = [];
  produtosMesa: Product[] = [];
  produtosFones: Product[] = [];
  produtosBateria: Product[] = [];
  produtosDestaque: Product[] = [];

  ngOnInit(): void {
    this.productService.getPromocaoSemanal().subscribe(p => this.promocaoSemanal = p);
    this.productService.getByCategoria('audio').subscribe(p => this.instrumentosEstudio = p);
    this.productService.getByCategoria('ingresso').subscribe(p => this.produtosIngresso = p);
    this.productService.getByCategoria('cordas').subscribe(p => this.produtosCordas = p);
    this.productService.getByCategoria('audio').subscribe(p => this.produtosAudio = p);
    this.productService.getByCategoria('mesa').subscribe(p => this.produtosMesa = p);
    this.productService.getByCategoria('fones').subscribe(p => this.produtosFones = p);
    this.productService.getByCategoria('bateria').subscribe(p => this.produtosBateria = p);

    this.productService.getAll().subscribe(p => {
      this.produtosDestaque = p.slice(0, 8);
    });
  }
}