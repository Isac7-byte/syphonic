import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService, Product } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [ProductCard, RouterLink, FormsModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos implements OnInit {
  private productSvc = inject(ProductService);

  todos = signal<Product[]>([]);
  loading = signal(true);
  busca = signal('');
  categoriaAtiva = signal('todos');

  categorias = [
    { slug: 'todos',   label: 'Todos',        icon: 'ti-apps' },
    { slug: 'cordas',  label: 'Cordas',        icon: 'ti-guitar-pick' },
    { slug: 'audio',   label: 'Áudio',         icon: 'ti-speakerphone' },
    { slug: 'mesa',    label: 'Mesa de Som',   icon: 'ti-adjustments' },
    { slug: 'fones',   label: 'Fones',         icon: 'ti-headphones' },
    { slug: 'bateria', label: 'Bateria',       icon: 'ti-circle' },
  ];

  filtrados = computed(() => {
    let lista = this.todos();
    const cat = this.categoriaAtiva();
    const q = this.busca().toLowerCase().trim();

    // Excluir ingressos desta página
    lista = lista.filter(p => p.categoria !== 'ingresso');

    if (cat !== 'todos') {
      lista = lista.filter(p => p.categoria === cat);
    }
    if (q) {
      lista = lista.filter(p =>
        p.nome.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q)
      );
    }
    return lista;
  });

  ngOnInit() {
    this.productSvc.getAll().subscribe({
      next: (produtos) => {
        this.todos.set(produtos);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  setCategoria(slug: string) {
    this.categoriaAtiva.set(slug);
  }

  setBusca(valor: string) {
    this.busca.set(valor);
  }
}
