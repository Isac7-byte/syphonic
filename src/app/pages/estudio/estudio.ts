import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

interface Sala {
  nome: string;
  imagem: string;
  descricao: string;
  equipamentos: string[];
  precoPorHora: number;
}

@Component({
  selector: 'app-estudio',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './estudio.html',
  styleUrl: './estudio.css'
})
export class Estudio {

  estudios: Sala[] = [
    {
      nome: 'Sala A - Master',
      imagem: 'https://i.pinimg.com/736x/14/78/66/14786632277f9854e25e990411111164.jpg',
      descricao: 'Nossa sala principal, tratada acusticamente para máxima fidelidade. Ideal para bandas completas e gravações de bateria.',
      equipamentos: ['Console SSL 4000', 'Monitores Yamaha HS8', 'Bateria Pearl Session', 'Amps Fender & Marshall'],
      precoPorHora: 120
    },
    {
      nome: 'Sala B - Vocal & Produção',
      imagem: 'https://i.pinimg.com/1200x/c1/f0/73/c1f0732dcbd997e887cc39cf4ea1ce7f.jpg',
      descricao: 'Ambiente intimista focado em captação de vozes cristalinas e produção de beats. Isolamento perfeito.',
      equipamentos: ['Mic Neumann U87', 'Interface Apollo Twin', 'Teclado Nord Stage 3', 'Monitores KRK Rokit 7'],
      precoPorHora: 80
    },
    {
      nome: 'Sala C - Podcast & Streaming',
      imagem: 'https://i.pinimg.com/736x/21/cd/ca/21cdca649841f391e92ec4ef3ce8af54.jpg',
      descricao: 'O espaço moderno para criadores de conteúdo. Pronto para gravar podcasts com áudio e vídeo de alta qualidade.',
      equipamentos: ['4x Mics Shure SM7B', 'Mesa RØDECaster Pro', 'Iluminação LED RGB', 'Câmeras 4K'],
      precoPorHora: 60
    }
  ];

  horarios = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  // Reserva
  salaSelecionada = signal<Sala | null>(null);
  dataSelecionada = signal('');
  horarioInicio = signal('');
  horarioFim = signal('');
  reservaOk = signal(false);

  get dataMinima(): string {
    return new Date().toISOString().split('T')[0];
  }

  horariosDisponiveis = computed(() => {
    const inicio = this.horarioInicio();
    if (!inicio) return this.horarios;
    const idx = this.horarios.indexOf(inicio);
    return this.horarios.slice(idx + 1);
  });

  totalHoras = computed(() => {
    const ini = this.horarioInicio();
    const fim = this.horarioFim();
    if (!ini || !fim) return 0;
    return parseInt(fim) - parseInt(ini);
  });

  totalPreco = computed(() => {
    const sala = this.salaSelecionada();
    if (!sala) return 0;
    return this.totalHoras() * sala.precoPorHora;
  });

  selecionarSala(sala: Sala) {
    this.salaSelecionada.set(sala);
    this.horarioInicio.set('');
    this.horarioFim.set('');
    setTimeout(() => {
      document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  confirmarReserva() {
    if (!this.salaSelecionada() || !this.dataSelecionada() || !this.horarioInicio() || !this.horarioFim()) return;
    this.reservaOk.set(true);
  }

  novaReserva() {
    this.salaSelecionada.set(null);
    this.dataSelecionada.set('');
    this.horarioInicio.set('');
    this.horarioFim.set('');
    this.reservaOk.set(false);
  }

  scrollParaReserva() {
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' });
  }
}