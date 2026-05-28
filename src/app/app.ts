import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ProductModal } from './components/product-modal/product-modal';
import { CartSidebar } from './components/cart-sidebar/cart-sidebar';
import { ToastComponent } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ProductModal, CartSidebar, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
