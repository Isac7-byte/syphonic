import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toast = signal<ToastMessage | null>(null);
  readonly toast = this._toast.asReadonly();

  private _timer: any;

  show(text: string, success = true): void {
    clearTimeout(this._timer);
    this._toast.set({ text, success });
    this._timer = setTimeout(() => this._toast.set(null), 3000);
  }
}
