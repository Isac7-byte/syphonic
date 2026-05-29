import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService, Product } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';

const SLUG_CONFIG: Record<string, { label: string; sublabel: string }> = {
    'promocao-semanal': { label: 'Promoção Semanal', sublabel: 'Em destaque' },
    'studio': { label: 'Instrumentos de Estúdio', sublabel: 'Para produtores' },
    'ingressos': { label: 'Ingressos', sublabel: 'Eventos' },
    'cordas': { label: 'Cordas', sublabel: 'Categoria' },
    'audio': { label: 'Áudio', sublabel: 'Categoria' },
    'mesa': { label: 'Mesa de Som', sublabel: 'Categoria' },
    'fones': { label: 'Fones', sublabel: 'Categoria' },
    'bateria': { label: 'Bateria', sublabel: 'Categoria' },
};

@Component({
    selector: 'app-categoria',
    standalone: true,
    imports: [ProductCard, RouterLink, CurrencyPipe],
    templateUrl: './categoria.html',
    styleUrl: './categoria.css'
})
export class Categoria implements OnInit {
    private route = inject(ActivatedRoute);
    private productSvc = inject(ProductService);

    slug = signal('');
    config = signal<{ label: string; sublabel: string } | null>(null);
    produtos = signal<Product[]>([]);
    loading = signal(true);

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const slug = params.get('slug') ?? '';
            this.slug.set(slug);
            this.config.set(SLUG_CONFIG[slug] ?? { label: slug, sublabel: 'Categoria' });
            this.loading.set(true);
            this.carregarProdutos(slug);
        });
    }

    private carregarProdutos(slug: string) {
        const obs$ = slug === 'promocao-semanal'
            ? this.productSvc.getPromocaoSemanal()
            : this.productSvc.getByCategoria(this.slugToCategoria(slug));

        obs$.subscribe({
            next: (produtos: Product[]) => {
                this.produtos.set(produtos);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    private slugToCategoria(slug: string): string {
        const map: Record<string, string> = {
            'studio': 'audio',
            'ingressos': 'ingresso',
            'cordas': 'cordas',
            'audio': 'audio',
            'mesa': 'mesa',
            'fones': 'fones',
            'bateria': 'bateria',
        };
        return map[slug] ?? slug;
    }
}