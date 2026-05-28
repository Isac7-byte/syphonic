import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  template: `
    @if (toastService.toast()) {
      <div class="symphonic-toast toast-visible" [class.toast-success]="toastService.toast()!.success">
        {{ toastService.toast()!.text }}
      </div>
    }
  `,
  styles: [`
    .symphonic-toast {
      position: fixed; bottom: 32px; left: 50%;
      transform: translateX(-50%);
      background: #1e1e2e; border: 1px solid rgba(200,120,58,0.5);
      color: #fff; font-family: 'Barlow Condensed', sans-serif;
      font-size: 1rem; font-weight: 500;
      padding: 14px 28px; border-radius: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      z-index: 99999; animation: toastIn 0.35s ease;
    }
    @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
    .toast-success { border-color: rgba(200,120,58,0.8); }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
