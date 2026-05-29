import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Artista {
  id: number;
  nome: string;
  genero: string;
  imagem: string;
  shows: { data: string; local: string }[];
  destaque: boolean;
}

@Component({
  selector: 'app-artistas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './artistas.html',
  styleUrl: './artistas.css'
})
export class Artistas {

  artistas = signal<Artista[]>([
    {
      id: 1,
      nome: 'Osamason',
      genero: 'Hip-Hop / R&B',
      imagem: 'https://i.pinimg.com/736x/be/a0/f2/bea0f2d04f5f3f05c14ab3e174778e2d.jpg',
      destaque: true,
      shows: [
        { data: '10 Mai', local: 'Orlando, FL' },
        { data: '28 Ago', local: 'Toronto, Canadá' },
      ]
    },
    {
      id: 2,
      nome: 'Chief Keef',
      genero: 'Drill / Trap',
      imagem: 'https://i.pinimg.com/1200x/4d/46/4c/4d464cc870423d810125d966e9341be1.jpg',
      destaque: true,
      shows: [
        { data: '8 Mar', local: 'Orlando, FL' },
      ]
    },
    {
      id: 3,
      nome: 'Sabrina Carpenter',
      genero: 'Pop',
      imagem: 'https://i.pinimg.com/736x/4a/9e/79/4a9e79b21ff80abb037cd717625ce180.jpg',
      destaque: true,
      shows: [
        { data: '9 Abr', local: 'Índio, CA' },
      ]
    },
    {
      id: 4,
      nome: '2hollis',
      genero: 'Indie / Alternative',
      imagem: 'https://i.pinimg.com/736x/a1/7f/0c/a17f0c9768dce9ee740d391d12869409.jpg',
      destaque: false,
      shows: [
        { data: '4 Jun', local: 'Nova Iorque, NY' },
      ]
    },
    {
      id: 5,
      nome: 'Brocasito',
      genero: 'Latin / Urbano',
      imagem: 'https://i.pinimg.com/736x/ef/45/51/ef4551766b7b5453315e4b09675d966c.jpg',
      destaque: false,
      shows: [
        { data: '4 Jun', local: 'Nova Iorque, NY' },
      ]
    },
    {
      id: 6,
      nome: 'Playboi Carti',
      genero: 'Trap / Rap',
      imagem: 'https://i.pinimg.com/736x/be/83/a3/be83a3e0f22bbc9a3b769fe0631f6518.jpg',
      destaque: false,
      shows: [
        { data: '15 Jul', local: 'Houston, TX' },
      ]
    },
    {
      id: 7,
      nome: 'Molly Santana',
      genero: 'Soul / R&B',
      imagem: 'https://i.pinimg.com/736x/f9/b2/b7/f9b2b70598e6ed4b9be4be4cae9202fc.jpg',
      destaque: false,
      shows: [
        { data: '22 Ago', local: 'Los Angeles, CA' },
      ]
    },
  ]);

  destaques = this.artistas().filter(a => a.destaque);
  outros = this.artistas().filter(a => !a.destaque);
}
