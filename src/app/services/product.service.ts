import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  parcelamento: string;
  promocaoSemanal: boolean;
  desconto: number;
  categoria: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/produtos`);
  }

  getPromocaoSemanal(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/produtos?promocaoSemanal=true`);
  }

  getInstrumentosEstudio(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/produtos?categoria=audio&categoria=mesa&categoria=fones`);
  }

  getByCategoria(categoria: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/produtos?categoria=${categoria}`);
  }
}
