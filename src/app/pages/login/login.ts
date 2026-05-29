import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  isRegistering = signal(false);

  // Form fields
  nome = signal('');
  email = signal('');
  senha = signal('');

  toggleMode() {
    this.isRegistering.set(!this.isRegistering());
    this.senha.set('');
  }

  onSubmit() {
    if (!this.email() || !this.senha()) {
      this.toast.show('Preencha todos os campos obrigatórios');
    }

    if (this.isRegistering()) {
      if (!this.nome()) {
        this.toast.show('O nome é obrigatório para cadastro',);
        return;
      }

      const success = this.auth.register(this.nome(), this.email(), this.senha());
      if (success) {
        this.toast.show('Conta criada com sucesso!', true);
        this.router.navigate(['/']);
      } else {
        this.toast.show('E-mail já está em uso.', false);
      }

    } else {
      const success = this.auth.login(this.email(), this.senha());
      if (success) {
        this.toast.show('Login realizado com sucesso!', true);
        this.router.navigate(['/']);
      } else {
        this.toast.show('E-mail ou senha inválidos.', false);
      }
    }
  }
}
