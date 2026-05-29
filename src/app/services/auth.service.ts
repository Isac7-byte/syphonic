import { Injectable, signal } from '@angular/core';

export interface User {
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor() {
    this.loadSession();
  }

  private loadSession() {
    const sessionStr = localStorage.getItem('symphonic_session');
    if (sessionStr) {
      try {
        this.currentUser.set(JSON.parse(sessionStr));
      } catch (e) {
        this.logout();
      }
    }
  }

  login(email: string, pass: string): boolean {
    const usersStr = localStorage.getItem('symphonic_users');
    if (usersStr) {
      const users = JSON.parse(usersStr);
      const user = users.find((u: any) => u.email === email && u.senha === pass);
      if (user) {
        const sessionUser = { nome: user.nome, email: user.email };
        this.currentUser.set(sessionUser);
        localStorage.setItem('symphonic_session', JSON.stringify(sessionUser));
        return true;
      }
    }
    return false;
  }

  register(nome: string, email: string, pass: string): boolean {
    const usersStr = localStorage.getItem('symphonic_users');
    let users = [];
    if (usersStr) {
      users = JSON.parse(usersStr);
    }
    
    // Check if email already exists
    if (users.find((u: any) => u.email === email)) {
      return false; 
    }

    const newUser = { nome, email, senha: pass };
    users.push(newUser);
    localStorage.setItem('symphonic_users', JSON.stringify(users));
    
    // Auto login
    const sessionUser = { nome: newUser.nome, email: newUser.email };
    this.currentUser.set(sessionUser);
    localStorage.setItem('symphonic_session', JSON.stringify(sessionUser));
    
    return true;
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('symphonic_session');
  }
}
